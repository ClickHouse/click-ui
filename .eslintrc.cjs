module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-refresh", "prefer-arrow-functions"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-multiple-empty-lines": "error",
    quotes: ["error", "double", { "avoidEscape": true }],
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
    "react-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "(useUpdateEffect)"
    }]  
  },
};
