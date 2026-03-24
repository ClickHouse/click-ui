// Find rules at https://stylelint.io/user-guide/rules
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  ignoreFiles: ['src/theme/styles/**/*.css'],
  rules: {
    // NOTE: BEM naming convention (block__element--modifier)
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(__[a-z][a-z0-9]*)?(-{1,2}[a-z][a-z0-9]*)*$',
      {
        message:
          'Expected class selector to follow BEM convention (block__element--modifier)',
      },
    ],
    // NOTE: Disable value-keyword-case for font family names (they are case-sensitive)
    'value-keyword-case': [
      'lower',
      {
        ignoreFunctions: ['local'],
        ignoreKeywords: [
          'BlinkMacSystemFont',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Inter',
          'Arial',
          'Helvetica',
        ],
      },
    ],
    // NOTE: Browser compatibility warnings for 2020 browsers
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'error',
        ignore: [
          // NOTE: The css nesting can be ignored
          // it'll be transpiled by transformer
          'css-nesting',
        ],
      },
    ],
  },
};
