import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';
import type { ThemeName } from './theme.types';

export type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const themes: Record<ThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};
