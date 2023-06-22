import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { merge } from "lodash";
import * as classicTheme from "../styles/variables.classic.json";
import * as darkTheme from "../styles/variables.dark.json";
import * as lightTheme from "../styles/variables.light.json";
import * as theme from "../styles/variables.json";
import { Theme } from "@/styles/types";
import { ThemeName } from ".";

const themes: Record<ThemeName, Theme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
  classic: merge({}, theme, classicTheme),
};
const ThemeProvider = ({
  theme: name,
  children,
}: {
  theme: ThemeName;
  children: React.ReactNode;
}) => (
  <StyledThemeProvider theme={themes[name]}>{children}</StyledThemeProvider>
);

export { ThemeProvider };
