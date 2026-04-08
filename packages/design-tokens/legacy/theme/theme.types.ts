/**
 * @deprecated This module is deprecated. Use the new CSS variable-based tokens instead.
 * Import from '@clickhouse/design-tokens/legacy' only for backward compatibility.
 */

import lightTheme from './tokens/variables.light';

export type Theme = typeof lightTheme;

export type ThemeName = 'dark' | 'light';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
