import lightTheme from './tokens/variables.light';
import { THEMES } from './theme.core';

export type Theme = typeof lightTheme;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
