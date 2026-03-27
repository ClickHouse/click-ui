// Find rules at https://stylelint.io/user-guide/rules
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-order'],
  ignoreFiles: ['src/theme/styles/**/*.css'],
  rules: {
    // NOTE: Property ordering by logical groups
    'order/properties-order': [
      [
        // Content & display
        'content',
        'display',
        'visibility',
        'opacity',
        // Positioning
        'position',
        'z-index',
        'top',
        'right',
        'bottom',
        'left',
        'inset',
        // Box model
        'box-sizing',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'overflow',
        'overflow-x',
        'overflow-y',
        // Flexbox
        'flex',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-content',
        'align-self',
        'order',
        'gap',
        // Grid
        'grid',
        'grid-template',
        'grid-template-columns',
        'grid-template-rows',
        'grid-template-areas',
        'grid-column',
        'grid-row',
        // Border
        'border',
        'border-width',
        'border-style',
        'border-color',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-radius',
        // Background
        'background',
        'background-color',
        'background-image',
        'background-position',
        'background-size',
        'background-repeat',
        // Typography
        'color',
        'font',
        'font-family',
        'font-size',
        'font-weight',
        'font-style',
        'line-height',
        'letter-spacing',
        'text-align',
        'text-decoration',
        'text-transform',
        'white-space',
        'word-break',
        'word-wrap',
        // Visual
        'outline',
        'outline-width',
        'outline-style',
        'outline-color',
        'outline-offset',
        'box-shadow',
        'cursor',
        'pointer-events',
        // Animation
        'transition',
        'transform',
        'animation',
      ],
      { unspecified: 'bottomAlphabetical' },
    ],
    // TODO: Maybe create an utility or test to make sure
    // its computed correctly
    // NOTE: BEM naming convention (block-name__elem-name_mod-name_mod-val) per naming convention https://en.bem.info/methodology/naming-convention
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(_[a-z][a-z0-9]*(-[a-z0-9]+)*)?(_[a-z][a-z0-9]*(-[a-z0-9]+)*)?$',
      {
        message:
          'Expected class selector to follow BEM convention (block-name__elem-name_mod-name_mod-val)',
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
    // NOTE: Browser compatibility warnings (see .browserslistrc)
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'error',
        ignore: [
          // NOTE: CSS nesting is transpiled by the build toolchain
          'css-nesting',
          // NOTE: :focus-visible has :focus fallback in place
          'css-focus-visible',
          // NOTE: iOS doesn't support cursors (touch devices), not applicable
          'css3-cursors',
          // NOTE: overflow: clip has fallback behavior with hidden
          'css-overflow',
        ],
      },
    ],
    // NOTE: Empty lines can help with readability
    'at-rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
  },
};
