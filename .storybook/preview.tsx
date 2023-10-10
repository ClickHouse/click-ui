import React from "react";
import type { Preview } from "@storybook/react";
import "../src/styles/variables.css";
import { Decorator } from "@storybook/react";
import styled from "styled-components";
import { themes } from "@storybook/theming";
import ClickUIProvider from "../src/components/ClickUIProvider/ClickUIProvider";

const ThemeBlock = styled.div<{ $left?: boolean; $bfill?: boolean }>(
  ({ $left, $bfill: fill, theme }) => `
      position: absolute;
      top: 0.5rem;
      left: ${$left || fill ? 0 : "50vw"};
      right: ${$left ? "50vw" : 0};
      width: 96vw;
      height: 100vh;
      bottom: 0;
      overflow: auto;
      padding: 1rem;
      background: ${theme.click.storybook.global.background};
    `
);

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "dark",
    toolbar: {
      // The icon for the toolbar item
      icon: "circlehollow",
      // Array of options
      items: [
        { value: "dark", icon: "moon", title: "dark" },
        { value: "light", icon: "sun", title: "light" },
        { value: "classic", icon: "circle", title: "classic" },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};
const withTheme: Decorator = (StoryFn, context) => {
  const parameters = context.parameters;
  const theme = parameters?.theme || context.globals.theme;
  return (
    <ClickUIProvider
      theme={theme}
      config={{ tooltip: { delayDuration: 0 } }}
    >
      <ThemeBlock $left>
        <StoryFn />
      </ThemeBlock>
    </ClickUIProvider>
  );
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Buttons",
          "Cards",
          "Forms",
          "Display",
          "Sidebar",
          "Typography",
          ["Title", "Text", "Link"],
        ],
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export const decorators = [withTheme];
export default preview;
