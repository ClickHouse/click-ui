/**
 * Shared ESLint configuration for TypeScript packages.
 *
 * Packages should create their own eslint.config.js that imports and extends this.
 * Excluded packages (using alternative linters):
 *   - design-tokens: uses Terrazzo's linter (tz lint)
 */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import storybook from 'eslint-plugin-storybook';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import type { Linter } from 'eslint';

export const ignores = {
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/build/**',
    '**/coverage/**',
    '**/*.d.ts',
  ],
};

export const baseConfigs = [js.configs.recommended, ...tseslint.configs.recommended];

export const plugins = {
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
  'prefer-arrow-functions': preferArrowFunctions,
  storybook: storybook,
  import: importPlugin,
};

export const sharedLanguageOptions = {
  ecmaVersion: 'latest' as const,
  sourceType: 'module' as const,
  parser: tseslint.parser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    ...globals.browser,
    ...globals.es2020,
  },
};

export const sharedRules: Linter.RulesRecord = {
  ...reactHooks.configs.recommended.rules,
  curly: ['error', 'all'],
  'react-refresh/only-export-components': 'warn',
  'no-multiple-empty-lines': 'error',
  quotes: ['error', 'single', { avoidEscape: true }],
  'arrow-parens': ['error', 'as-needed'],
  'prefer-arrow-functions/prefer-arrow-functions': [
    'warn',
    {
      classPropertiesAllowed: false,
      disallowPrototype: false,
      returnStyle: 'unchanged',
      singleReturnOnly: false,
    },
  ],
  'react-hooks/exhaustive-deps': [
    'warn',
    {
      additionalHooks: '(useUpdateEffect)',
    },
  ],
  '@typescript-eslint/no-empty-object-type': 'off',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/no-cycle': [
    'error',
    {
      maxDepth: 10,
      ignoreExternal: true,
      allowUnsafeDynamicCyclicDependency: false,
    },
  ],
  'import/no-self-import': 'error',
  '@typescript-eslint/no-deprecated': 'warn',
};

export const testFileRules: Linter.RulesRecord = {
  '@typescript-eslint/no-unused-expressions': 'off',
};

export const storybookConfigs = storybook.configs['flat/recommended'];

export { tseslint };
