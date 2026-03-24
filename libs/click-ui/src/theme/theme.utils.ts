import { THEMES } from '@/theme/theme.core';
import type { ThemeName } from '@/theme/theme.types';

export const isValidThemeName = (theme: string | undefined): theme is ThemeName =>
  theme !== undefined && ([THEMES.Dark, THEMES.Light] as Array<string>).includes(theme);

export const getFallbackThemeName = (theme: string | undefined): ThemeName =>
  isValidThemeName(theme) ? theme : THEMES.Light;

export const getDefaultThemeName = (): ThemeName => THEMES.Light;

export const getAvailableThemeNames = (): ThemeName[] => [THEMES.Dark, THEMES.Light];
