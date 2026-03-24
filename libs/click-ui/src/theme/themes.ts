import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';
import type { ThemeName, Theme } from './theme.types';

export const themes: Record<ThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};
