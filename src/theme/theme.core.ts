import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';
import type { Theme, ThemeName } from './theme.types';

export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export const themes: Record<ThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};
