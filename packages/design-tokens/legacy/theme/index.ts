/**
 * @deprecated This module is deprecated. Use the new CSS variable-based tokens instead.
 * Import from '@clickhouse/design-tokens/legacy/theme' only for backward compatibility.
 */

export { THEMES, themes } from './theme.core';
export type { ThemeName, Theme } from './theme.types';
export {
  isValidThemeName,
  getFallbackThemeName,
  getDefaultThemeName,
  getAvailableThemeNames,
} from './theme.utils';
export { InitCUIThemeScript } from './InitCUIThemeScript';
export type { InitCUIThemeScriptProps } from './InitCUIThemeScript';
