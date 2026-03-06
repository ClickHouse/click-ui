import lightTheme from './tokens/variables.light';

export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];

export type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
