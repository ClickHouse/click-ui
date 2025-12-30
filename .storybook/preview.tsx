import React from "react";
import type { Preview } from "@storybook/react-vite";
import { Decorator } from "@storybook/react-vite";
import styled from "styled-components";
import { themes } from "storybook/theming";
import ClickUIProvider from "../src/theme/ClickUIProvider/ClickUIProvider";

const ThemeBlock = styled.div<{ $left?: boolean; $bfill?: boolean }>(
  ({ $left, $bfill: fill, theme }) => `
      position: absolute;
      top: 0.5rem;
      left: ${$left || fill ? 0 : "50vw"};
      right: 0;
      height: fit-content;
      bottom: 0;
      overflow: auto;
      padding: 1rem;
      box-sizing: border-box;
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
          "Layout",
          "Forms",
          "Display",
          "Sidebar",
          "Typography",
          "Colors",
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
      codePanel: true
    },
  },
  argTypes: {
    // Hide children prop from docs table - it doesn't serialize well as a control
    children: { table: { disable: true } },
  },
};

export const decorators = [withTheme];
export default preview;
