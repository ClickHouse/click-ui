import { THEMES, type ThemeName } from './theme.types';

/**
 * Validates if a string is a valid theme name
 */
export const isValidThemeName = (theme: string | undefined): theme is ThemeName =>
  theme !== undefined && ([THEMES.Dark, THEMES.Light] as string[]).includes(theme);

/**
 * Returns the theme name if valid, otherwise returns the default (light) theme
 */
export const getFallbackThemeName = (theme: string | undefined): ThemeName =>
  isValidThemeName(theme) ? theme : THEMES.Light;

/**
 * Gets the default theme name
 */
export const getDefaultThemeName = (): ThemeName => THEMES.Light;

/**
 * Gets all available theme names
 */
export const getAvailableThemeNames = (): ThemeName[] => [THEMES.Dark, THEMES.Light];
