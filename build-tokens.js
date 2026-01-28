import { registerTransforms, transforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

const themes = ['dark', 'light'];

registerTransforms(StyleDictionary);

StyleDictionary.registerTransform({
  type: 'name',
  name: 'name/cti/dot',
  transformer: (token, options) => {
    if (options.prefix && options.prefix.length) {
      return [options.prefix].concat(token.path).join('.');
    } else {
      return token.path.join('.');
    }
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/es6-theme',
  formatter: function ({ dictionary, file }) {
    const themeName = file.destination.replace('variables.', '').replace('.ts', '');
    const theme = {};

    dictionary.allTokens.forEach(token => {
      let current = theme;
      const path = token.path;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        }
        current = current[key];
      }

      current[path[path.length - 1]] = token.value;
    });

    theme.name = themeName;

    return `const theme = ${JSON.stringify(theme, null, 2)};\n\nexport default theme;\n`;
  },
});

const themeDictionaries = themes.map(theme =>
  StyleDictionary.extend({
    include: [`./tokens/**/!(${themes.join('|*.')}).json`],
    source: [`./tokens/**/${theme}.json`],
    platforms: {
      ts: {
        transforms: [...transforms, 'name/cti/dot'],
        buildPath: 'src/theme/tokens/',
        files: [
          {
            destination: `variables.${theme}.ts`,
            format: 'typescript/es6-theme',
          },
        ],
      },
    },
  })
);

themeDictionaries.forEach(dict => {
  dict.cleanAllPlatforms();
  dict.buildAllPlatforms();
});
