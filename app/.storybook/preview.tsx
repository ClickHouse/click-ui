import React from "react";
import merge from "lodash/merge";
import type { Preview } from "@storybook/react";
import "../src/styles/variables.css";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Decorator } from "@storybook/react";
import classicTheme from "../src/styles/variables.classic.json";
import darkTheme from "../src/styles/variables.dark.json";
import lightTheme from "../src/styles/variables.light.json";
import theme from "../src/styles/variables.json";

import { Theme } from "../src/styles/types";

const themes: Record<string, DefaultTheme> = {
  dark: merge({}, theme, darkTheme),
  light: merge({}, theme, lightTheme),
  classic: merge({}, theme, classicTheme),
};

const withTheme: Decorator = StoryFn => (
  <ThemeProvider theme={themes.dark}>
    <StoryFn />
  </ThemeProvider>
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [withTheme];
export default preview;
