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
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
type CUIThemeType = Pick<Theme, "global" | "sizes" | "name">;
const useCUITheme = (): CUIThemeType => {
  const theme = useTheme();
  return {
    name: theme.name,
    global: theme.global,
    sizes: theme.sizes,
  };
};

export type { ThemeName, CUIThemeType };
export { useCUITheme };
