import merge from "lodash/merge"
import { Theme } from "../styles/types";
import classicTheme from "../styles/variables.classic.json"
import darkTheme from "../styles/variables.dark.json"
import lightTheme from "../styles/variables.light.json"
import theme from "../styles/variables.json"
import { DefaultTheme, ThemeProvider } from "styled-components";

declare module "styled-components" {
  export type DefaultTheme = Theme
}

const themes: Record<string, DefaultTheme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
  classic: merge({}, theme, classicTheme),
}

export {
  themes,
  ThemeProvider
}
