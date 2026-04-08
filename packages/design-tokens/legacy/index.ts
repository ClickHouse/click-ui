/**
 * @deprecated This module is deprecated. Use the new CSS variable-based tokens instead.
 * Import from '@clickhouse/design-tokens/legacy' only for backward compatibility.
 */

// Theme exports
export { THEMES, themes } from './theme/theme.core';
export type { ThemeName, Theme } from './theme/theme.types';
export {
  isValidThemeName,
  getFallbackThemeName,
  getDefaultThemeName,
  getAvailableThemeNames,
} from './theme/theme.utils';
export { InitCUIThemeScript } from './theme/InitCUIThemeScript';
export type { InitCUIThemeScriptProps } from './theme/InitCUIThemeScript';

// Hooks exports
export { useCUITheme, useInitialTheme } from './hooks';
export type { CUIThemeType, UseThemeParams } from './hooks';

// Utils exports
export { CUI_THEME_STORAGE_KEY } from './utils/localStorage';
export {
  THEME_ATTRIBUTE,
  getRootElement,
  setRootThemeAttribute,
  removeRootThemeAttribute,
} from './utils/dom';
