import { registerTransforms, transforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

registerTransforms(StyleDictionary);
const themes = ["dark", "light"];
const setWith = (obj, path, value) => {
  if (!obj || typeof obj !== "object") return obj;

  const keys = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      // Last key → set value
      current[key] = value;
    } else {
      // Ensure object/array exists
      if (current[key] == null || typeof current[key] !== "object") {
        current[key] = String(+keys[i + 1]) === keys[i + 1] ? [] : {};
      }
      current = current[key];
    }
  }

  return obj;
};

const generateThemeFromDictionary = (dictionary, valueFunc = value => value) => {
  const theme = {};
  dictionary.allTokens.forEach(token => {
    setWith(theme, token.name, valueFunc(token.value), Object)
  });
  return theme;
};

StyleDictionary.registerTransform({
  type: "name",
  name: "name/cti/dot",
  transformer: (token, options) => {
    if (options.prefix && options.prefix.length) {
      return [options.prefix].concat(token.path).join(".");
    } else {
      return token.path.join(".");
    }
  }
});

StyleDictionary.registerFormat({
  name: "ThemeFormat",
  formatter: ({ dictionary }) => {
    const theme = generateThemeFromDictionary(dictionary);
    return JSON.stringify(theme, null, 2);
  }
});

StyleDictionary.registerFormat({
  name: "TypescriptFormat",
  formatter: ({ dictionary }) => {
    const theme = generateThemeFromDictionary(dictionary, value => typeof value);

    return `
      export interface Theme ${JSON.stringify(theme, null, 2).replaceAll("\"string\"", "string").replaceAll("\"number\"", "number")}
    `
  }
});

StyleDictionary.extend({
  source: [`./tokens/**/!(${themes.join("|*.")}).json`],
  platforms: {
    css: {
      transforms: [...transforms, "name/cti/kebab"],
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transforms: [...transforms, "name/cti/dot"],
      buildPath: "src/theme/tokens/",
      files: [
        {
          destination: "variables.json",
          format: "ThemeFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    ts: {
      transforms: [...transforms, "name/cti/dot"],
      buildPath: "src/theme/tokens/",
      files: [
        {
          destination: "types.ts",
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
    include: [`./tokens/**/!(${themes.join("|*.")}).json`],
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
        buildPath: "src/theme/tokens/",
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
