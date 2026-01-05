import darkTheme from "./tokens/variables.dark";
import lightTheme from "./tokens/variables.light";
import { useTheme } from "styled-components";
import type { Prettify, GetTypes } from "./tokens/types";

export type ThemeName = "dark" | "light" | "classic";
type ActiveThemeName = "dark" | "light";

export type CUIThemeType = GetTypes<typeof lightTheme>;

export type PublicTheme = Prettify<{
  breakpoint: CUIThemeType["breakpoint"];
  global: CUIThemeType["global"];
  sizes: CUIThemeType["sizes"];
  name?: ThemeName;
}>;

export const themes: Record<ActiveThemeName, CUIThemeType> = {
  dark: darkTheme as unknown as CUIThemeType,
  light: lightTheme as unknown as CUIThemeType,
};

declare module "styled-components" {
  export interface DefaultTheme extends CUIThemeType {}
}

const useCUITheme = () => {
  const theme = useTheme();
  return {
    breakpoint: theme.breakpoint,
    global: theme.global,
    name: theme.name,
    sizes: theme.sizes,
  };
};

export { useCUITheme };
