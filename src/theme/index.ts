import { merge } from "lodash";
import * as classicTheme from "../styles/variables.classic.json";
import * as darkTheme from "../styles/variables.dark.json";
import * as lightTheme from "../styles/variables.light.json";
import * as theme from "../styles/variables.json";
import { DefaultTheme, ThemeProvider } from "styled-components";

const themes: Record<string, DefaultTheme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
  classic: merge({}, theme, classicTheme),
};

export { themes, ThemeProvider };
