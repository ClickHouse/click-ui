import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';

export { default as ClickUIProvider } from './ClickUIProvider';

export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];
export type ActiveThemeName = ThemeName;
export type Theme = typeof lightTheme;

export const themes: Record<ThemeName, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

// TODO: DefaultTheme can now be removed safely
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
