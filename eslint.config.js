import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import storybook from 'eslint-plugin-storybook';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', 'coverage/**', '**/*.d.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prefer-arrow-functions': preferArrowFunctions,
      storybook: storybook,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
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
    },
  },
  // Accessibility. `recommended` at `error`; violations that existed when it was switched on are
  // frozen in `eslint-suppressions.json` (see ACCESSIBILITY.md). New violations fail lint.
  jsxA11y.flatConfigs.recommended,
  {
    files: ['src/**/*.tsx'],
    settings: {
      'jsx-a11y': {
        // Both render a native <label>, so label rules see their call sites.
        components: { Label: 'label', GenericLabel: 'label' },
      },
    },
    rules: {
      // Outside `recommended`; both back MUSTs in AGENTS.md section 7 (no aria-hidden on a focusable
      // element; a control has an accessible name). Options are the plugin's own recommended ones;
      // the composite roles in `ignoreRoles` are left to axe.
      'jsx-a11y/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y/control-has-associated-label': [
        'error',
        {
          ignoreElements: [
            'audio',
            'canvas',
            'embed',
            'input',
            'textarea',
            'tr',
            'video',
          ],
          ignoreRoles: [
            'grid',
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'row',
            'tablist',
            'toolbar',
            'tree',
            'treegrid',
          ],
        },
      ],
    },
  },
  {
    // Stories may use placeholder `href="#"`. A missing href or a link acting as a button still fails.
    files: ['src/**/*.stories.tsx'],
    rules: {
      'jsx-a11y/anchor-is-valid': ['error', { aspects: ['noHref', 'preferButton'] }],
    },
  },
  // Special config for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  // Build plugins and repo scripts live outside tsconfig.json's `include`
  {
    files: ['plugins/**/*.ts', '.scripts/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...storybook.configs['flat/recommended']
);
