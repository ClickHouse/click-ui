import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';

export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ActiveThemeName = 'dark' | 'light';

export type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const themes: Record<ActiveThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};
