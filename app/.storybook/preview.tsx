import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/variables.css";
import { Decorator } from "@storybook/react";
import { ThemeProvider } from "../../src/theme";

const withTheme: Decorator = StoryFn => (
  <ThemeProvider theme="dark">
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
