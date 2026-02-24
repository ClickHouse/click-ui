import { ThemeName, THEMES } from '@/theme';

export const isValidThemeName = (theme: ThemeName): theme is ThemeName =>
  ([THEMES.Dark, THEMES.Light] as string[]).includes(theme);

export const getFallbackThemeName = (theme: ThemeName): ThemeName =>
  isValidThemeName(theme) ? theme : THEMES.Light;
