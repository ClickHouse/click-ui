import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';
import { useTheme } from 'styled-components';
import type { Prettify, GetTypes } from './tokens/types';

export { default as ClickUIProvider } from './ClickUIProvider';

type GeneralThemeType = typeof lightTheme;

// Full theme type with all properties (internal use and DefaultTheme)
export type Theme = Prettify<
  Omit<GetTypes<GeneralThemeType>, 'name'> & {
    name?: ThemeName;
  }
>;

// For backward compatibility: CUIThemeType is the public subset (like v0.0.244)
export type CUIThemeType = Prettify<{
  breakpoint: Theme['breakpoint'];
  global: Theme['global'];
  sizes: Theme['sizes'];
  name?: ThemeName;
}>;

// Alias for consistency
export type PublicTheme = CUIThemeType;

export const themes: Record<ActiveThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const useCUITheme = (): PublicTheme => {
  const theme = useTheme();
  return {
    breakpoint: theme.breakpoint,
    global: theme.global,
    name: theme.name as ThemeName | undefined,
    sizes: theme.sizes,
  };
};

export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];

export type ActiveThemeName = ThemeName;
