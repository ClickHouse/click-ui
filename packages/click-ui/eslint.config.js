import {
  ignores,
  baseConfigs,
  plugins,
  sharedLanguageOptions,
  sharedRules,
  testFileRules,
  storybookConfigs,
  tseslint,
} from '../../eslint.config.js';

export default tseslint.config(
  ignores,
  ...baseConfigs,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ...sharedLanguageOptions,
      parserOptions: {
        ...sharedLanguageOptions.parserOptions,
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins,
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.eslint.json',
        },
        node: true,
      },
    },
    rules: sharedRules,
  },
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    rules: testFileRules,
  },
  ...storybookConfigs
);
