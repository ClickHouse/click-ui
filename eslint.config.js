import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import storybook from "eslint-plugin-storybook";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "build/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "prefer-arrow-functions": preferArrowFunctions,
      storybook: storybook,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      curly: ['error', 'all'],
      "react-refresh/only-export-components": "warn",
      "no-multiple-empty-lines": "error",
      quotes: ["error", "double"],
      "arrow-parens": ["error", "as-needed"],
      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: "unchanged",
          singleReturnOnly: false,
        },
      ],
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "(useUpdateEffect)",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  // Special config for test files
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  ...storybook.configs["flat/recommended"]
);
