import { Theme } from "./tokens/types";
import merge from "lodash/merge";
import * as darkTheme from "./tokens/variables.dark.json";
import * as lightTheme from "./tokens/variables.light.json";
import * as theme from "./tokens/variables.json";
import { useTheme } from "styled-components";

type ActiveThemeName = "dark" | "light";

export const themes: Record<ActiveThemeName, Theme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
};

// Note: "classic" theme is deprecated and will fallback to "light" with a console warning
type ThemeName = ActiveThemeName | "classic";

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
