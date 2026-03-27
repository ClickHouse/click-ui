import {
  ignores,
  baseConfigs,
  plugins,
  sharedLanguageOptions,
  sharedRules,
  testFileRules,
  storybookConfigs,
  tseslint,
} from '../../eslint.config.ts';

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
    rules: {
      ...sharedRules,
      // click-ui specific: restrict barrel imports to prevent circular dependencies
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/components',
              message:
                'Do not import from the components barrel inside the library. Import from leaf modules (e.g., ../Icon/Icon) to avoid cycles.',
            },
            {
              name: '@/index',
              message:
                'Do not import from the package entry internally. Import from leaf modules instead.',
            },
          ],
          patterns: [
            {
              group: ['**/index', '**/index.ts', '**/index.tsx'],
              message:
                "Do not import from index files within the same component directory. Import directly from source files (e.g., './Button' instead of './index').",
            },
            {
              group: ['../**/index', '../**/index.ts', '../**/index.tsx'],
              message:
                "Do not import from sibling component index files. Import directly from the source file (e.g., '../Button/Button' instead of '../Button').",
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    rules: testFileRules,
  },
  ...storybookConfigs
);
