import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { fileHeader } from "style-dictionary/utils";

await register(StyleDictionary);

const themes = ["light", "dark"];

/**
 * Custom SCSS format that generates light-dark() CSS function
 * Compares light and dark theme tokens to create dual-theme variables
 */
StyleDictionary.registerFormat({
  name: 'scss/tokens-with-light-dark',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file, commentStyle: 'short' });

    // Build dark theme for comparison (in-memory only)
    const darkSD = new StyleDictionary({
      source: [
        './tokens/**/!(light|dark|$themes|$metadata).json',
        './tokens/themes/dark.json'
      ],
      preprocessors: ['tokens-studio'],
      platforms: {
        temp: {
          transformGroup: 'tokens-studio',
          buildPath: '.temp/',
          files: []
        }
      }
    });
    await darkSD.buildPlatform('temp');
    const darkDictionary = darkSD._dictionaries?.temp;

    // Create fast lookup map for dark tokens (O(1) vs O(n) with Array.find)
    const darkTokenMap = new Map();
    if (darkDictionary?.allTokens) {
      darkDictionary.allTokens.forEach(token => {
        if (token?.path) {
          darkTokenMap.set(token.path.join('.'), token.value);
        }
      });
    }

    // Get union of all token paths from both themes
    const allTokenPaths = new Set([
      ...dictionary.allTokens.map(t => t.path.join('.')),
      ...Array.from(darkTokenMap.keys())
    ]);

    // Create light token lookup map
    const lightTokenMap = new Map();
    dictionary.allTokens.forEach(token => {
      lightTokenMap.set(token.path.join('.'), token);
    });

    // Generate SCSS variables with direct values (no CSS custom properties)
    const scssVarLines = [];

    for (const pathKey of allTokenPaths) {
      const lightToken = lightTokenMap.get(pathKey);
      const lightValue = lightToken?.value;
      const darkValue = darkTokenMap.get(pathKey);

      // Skip if neither theme has this token (shouldn't happen)
      if (lightValue === undefined && darkValue === undefined) {
        continue;
      }

      // Convert path to camelCase for SCSS variable name
      // e.g., "click.global.color.text" → "clickGlobalColorText"
      const varName = pathKey.split('.').map((part, idx) =>
        idx === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      ).join('');

      // Clean values: remove trailing semicolons that may be in token source
      const cleanValue = (val) => val ? String(val).replace(/;\s*$/, '') : val;
      const cleanedLightValue = cleanValue(lightValue);
      const cleanedDarkValue = cleanValue(darkValue);

      // Determine the value to use
      let value;
      if (cleanedLightValue !== undefined && cleanedDarkValue !== undefined) {
        if (cleanedLightValue !== cleanedDarkValue) {
          // Both themes, different values → use light-dark()
          value = `light-dark(${cleanedLightValue}, ${cleanedDarkValue})`;
        } else {
          // Both themes, same value → use single value
          value = cleanedLightValue;
        }
      } else if (cleanedLightValue !== undefined) {
        // Only in light theme → use light value
        value = cleanedLightValue;
      } else {
        // Only in dark theme → use dark value as fallback
        value = cleanedDarkValue;
      }

      // Generate SCSS variable with direct value (no var() wrapper)
      // Handle complex values (font stacks, etc.) properly without unquote()
      const valueStr = String(value);


      scssVarLines.push(`$${varName}: ${valueStr} !default;`);
    }

    // Output only SCSS variables (no CSS custom properties block)
    const output = [
      header,
      '// SCSS Variables with light-dark() values (compile-time)',
      ...scssVarLines,
      ''
    ];

    return output.join('\n');
  }
});

/**
 * TypeScript theme format - generates clean typed theme objects
 */
StyleDictionary.registerFormat({
  name: 'typescript/es6-theme',
  format: ({ dictionary }) => {
    const theme = {};

    dictionary.allTokens.forEach((token) => {
      // Use custom path setting to preserve object structure
      // lodash/set converts objects with numeric keys to arrays, which breaks "full"
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

    return `const theme = ${JSON.stringify(theme, null, 2)} as const;\n\nexport default theme;\n`;
  }
});

/**
 * Style Dictionary configuration
 * Generates:
 * - SCSS file with light-dark() variables (tree-shakeable)
 * - TypeScript theme files for styled-components
 */
export async function getStyleDictionaryConfig() {
  return {
    themes,
    configs: {
      // SCSS output: single file with light-dark() for both themes
      scss: {
        source: [
          './tokens/**/!(light|dark|$themes|$metadata).json',
          './tokens/themes/light.json'
        ],
        preprocessors: ['tokens-studio'],
        log: { warnings: 'warn', errors: { brokenReferences: 'warn' } },
        platforms: {
          scss: {
            transformGroup: 'tokens-studio',
            buildPath: 'src/styles/',
            files: [
              {
                destination: 'tokens-light-dark.scss',
                format: 'scss/tokens-with-light-dark',
              },
            ],
          },
        },
      },

      // TypeScript output: separate files per theme for styled-components
      theme: (themeName) => ({
        source: [
          './tokens/**/!(light|dark|$themes|$metadata).json',
          `./tokens/themes/${themeName}.json`
        ],
        preprocessors: ['tokens-studio'],
        platforms: {
          ts: {
            transformGroup: 'tokens-studio',
            buildPath: 'src/theme/tokens/',
            files: [
              {
                destination: `variables.${themeName}.ts`,
                format: 'typescript/es6-theme',
              },
            ],
          },
        },
      }),
    },
  };
}

export default StyleDictionary;
