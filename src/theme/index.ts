import darkTheme from './tokens/variables.dark';
import lightTheme from './tokens/variables.light';

// TODO: Can the custom types be simplified
// bye preferring to use the library provided
// types for each required case? And where possible
// can it be inferred instead?
// Try to make it more readable
type WidenLiteral<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T;

type GetTypes<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? WidenLiteral<U>[]
    : T[K] extends object
      ? GetTypes<T[K]>
      : WidenLiteral<T[K]>;
};

type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & {};

export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];

export type ActiveThemeName = ThemeName;

type GeneralThemeType = typeof lightTheme;

export type Theme = Prettify<
  Omit<GetTypes<GeneralThemeType>, 'name'> & {
    name?: ThemeName;
  }
>;

export const themes: Record<ActiveThemeName, Theme> = {
  dark: darkTheme as unknown as Theme,
  light: lightTheme as unknown as Theme,
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
