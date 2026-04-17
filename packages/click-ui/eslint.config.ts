import {
  ignores,
  baseConfigs,
  plugins,
  sharedLanguageOptions,
  sharedRules,
  testFileRules,
  tseslint,
} from '../../eslint.config.ts';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';

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
    plugins: {
      ...plugins,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      storybook: storybook,
    },
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
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useUpdateEffect)',
        },
      ],
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
  ...storybook.configs['flat/recommended']
);
