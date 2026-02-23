import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';
import type { Prettify, GetTypes } from './tokens/types';
import type { ThemeName } from './theme.types';

export type ActiveThemeName = 'dark' | 'light';

type GeneralThemeType = typeof lightTheme;

// Full theme type with all properties (internal use and DefaultTheme)
export type Theme = Prettify<
  Omit<GetTypes<GeneralThemeType>, 'name'> & {
    name?: ThemeName;
  }
>;

export const themes: Record<ActiveThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};
