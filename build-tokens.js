const _ = require("lodash")
const {
  registerTransforms,
  transforms,
} = require("@tokens-studio/sd-transforms");
const StyleDictionary = require("style-dictionary");

registerTransforms(StyleDictionary);
const themes = ["classic", "dark", "light"];

function generateThemeFromDictionary (dictionary, valueFunc = (value) => value) {
  const theme = {};
  dictionary.allTokens.forEach((token) => {
    _.setWith(theme, token.name, valueFunc(token.value), Object)
  });
  return theme;
}

StyleDictionary.registerTransform({
  type: "name",
  name: "name/cti/dot",
  transformer: (token, options) => {
    if (options.prefix && options.prefix.length) {
      return [options.prefix].concat(token.path).join('.');
    } else {
      return token.path.join('.');
    }
  }
});

StyleDictionary.registerFormat({
  name: "ThemeFormat",
  formatter: function({ dictionary, platform, options, file }) {
    const theme = generateThemeFromDictionary(dictionary);
    return JSON.stringify(theme, null, 2);
  }
});

StyleDictionary.registerFormat({
  name: "TypescriptFormat",
  formatter: function({ dictionary, platform, options, file }) {
    const theme = generateThemeFromDictionary(dictionary, (value) => typeof value);
    
    return `
      export interface Theme ${JSON.stringify(theme, null, 2).replaceAll("\"string\"", "string")}
    `
  }
});

StyleDictionary.extend({
  source: [`./tokens/**/!(${themes.join(`|*.`)}).json`],
  platforms: {
    css: {
      transforms: [...transforms, "name/cti/kebab"],
      buildPath: "build/css/",
      files: [
        {
          destination: `variables.css`,
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transforms: [...transforms, "name/cti/dot"],
      buildPath: "src/styles/",
      files: [
        {
          destination: `variables.json`,
          format: "ThemeFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    ts: {
      transforms: [...transforms, "name/cti/dot"],
      buildPath: "src/styles/",
      files: [
        {
          destination: `types.ts`,
          format: "TypescriptFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
})
  .cleanAllPlatforms()
  .buildAllPlatforms();

themes.forEach(theme =>
  StyleDictionary.extend({
    include: [`./tokens/**/!(${themes.join(`|*.`)}).json`],
    source: [`./tokens/**/${theme}.json`],
    platforms: {
      css: {
        transforms: [...transforms, "name/cti/kebab"],
        buildPath: "build/css/",
        files: [
          {
            destination: `variables.${theme}.css`,
            format: "css/variables",
            filter: token => token.filePath.indexOf(`${theme}`) > -1,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        transforms: [...transforms, "name/cti/dot"],
        buildPath: "src/styles/",
        files: [
          {
            destination: `variables.${theme}.json`,
            format: "ThemeFormat",
            filter: token => token.filePath.indexOf(`${theme}`) > -1,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  })
    .cleanAllPlatforms()
    .buildAllPlatforms()
);
