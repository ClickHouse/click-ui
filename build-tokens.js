const {
  registerTransforms,
  transforms,
} = require("@tokens-studio/sd-transforms");
const StyleDictionary = require("style-dictionary");

registerTransforms(StyleDictionary);
const themes = ["classic", "dark", "light"];

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
      transforms: [...transforms, "name/cti/camel"],
      buildPath: "build/js/",
      files: [
        {
          destination: `variables.js`,
          format: "javascript/es6",
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
        transforms: [...transforms, "name/cti/camel"],
        buildPath: "build/js/",
        files: [
          {
            destination: `variables.${theme}.js`,
            format: "javascript/es6",
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
