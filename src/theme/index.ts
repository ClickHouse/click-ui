import { Theme } from "../styles/types";
import merge from "lodash/merge";
import * as classicTheme from "../styles/variables.classic.json";
import * as darkTheme from "../styles/variables.dark.json";
import * as lightTheme from "../styles/variables.light.json";
import * as theme from "../styles/variables.json";
import { useTheme } from "styled-components";

export const themes: Record<ThemeName, Theme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
  classic: merge({}, theme, classicTheme),
};
type ThemeName = "dark" | "light" | "classic";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
type CUIThemeType = Pick<Theme, "breakpoint" | "global" | "name" | "sizes">;
const useCUITheme = (): CUIThemeType => {
  const theme = useTheme();
  return {
    breakpoint: theme.breakpoint,
    global: theme.global,
    name: theme.name,
    sizes: theme.sizes,
  };
};

export type { ThemeName, CUIThemeType };
export { useCUITheme };
