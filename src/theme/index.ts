import { Theme } from "../styles/types";
import { ThemeProvider } from "./theme";
import { merge } from "lodash";
import * as classicTheme from "../styles/variables.classic.json";
import * as darkTheme from "../styles/variables.dark.json";
import * as lightTheme from "../styles/variables.light.json";
import * as theme from "../styles/variables.json";

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

export type { ThemeName };
export { ThemeProvider };
