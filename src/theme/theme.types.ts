import lightTheme from './tokens/variables.light';

export type Theme = typeof lightTheme;

export type ThemeName = 'dark' | 'light';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
