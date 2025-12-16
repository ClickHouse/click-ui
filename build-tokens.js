import _ from "lodash";
import { registerTransforms, transforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

registerTransforms(StyleDictionary);
const themes = ["dark", "light"];

function generateThemeFromDictionary(dictionary, valueFunc = value => value) {
  const theme = {};
  dictionary.allTokens.forEach(token => {
    _.setWith(theme, token.name, valueFunc(token.value), Object);
  });
  return theme;
}

StyleDictionary.registerTransform({
  type: "name",
  name: "name/cti/dot",
  transformer: (token, options) => {
    if (options.prefix && options.prefix.length) {
      return [options.prefix].concat(token.path).join(".");
    } else {
      return token.path.join(".");
    }
  },
});

StyleDictionary.registerFormat({
  name: "ThemeFormat",
  formatter: function ({ dictionary, platform, options, file }) {
    const theme = generateThemeFromDictionary(dictionary);
    return JSON.stringify(theme, null, 2);
  },
});

StyleDictionary.registerFormat({
  name: "TypescriptFormat",
  formatter: function ({ dictionary, platform, options, file }) {
    const theme = generateThemeFromDictionary(dictionary, value => typeof value);

    // Convert the theme object to a TypeScript interface string
    // Prettier will format this automatically via the generate-tokens script
    let jsonString = JSON.stringify(theme, null, 2);

    // Replace type strings with TypeScript types
    jsonString = jsonString.replaceAll('"string"', "string");
    jsonString = jsonString.replaceAll('"number"', "number");

    return `export interface Theme ${jsonString}\n`;
  },
});

StyleDictionary.extend({
  source: [`./tokens/**/!(${themes.join("|*.")}).json`],
  platforms: {
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
