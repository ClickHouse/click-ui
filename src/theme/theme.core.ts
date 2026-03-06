import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';
import type { Theme, ThemeName } from './theme.types';

export const THEMES: Record<Capitalize<ThemeName>, ThemeName> = {
  Dark: 'dark',
  Light: 'light',
};

// Note: darkTheme and lightTheme have different
// token values but compatible structures.
// We use 'satisfies' to ensure type compatibility
// without casting, allowing TypeScript
// to infer the most precise type while still
// checking against the Theme interface.
export const themes = {
  dark: darkTheme,
  light: lightTheme,
} satisfies Record<ThemeName, Theme>;
