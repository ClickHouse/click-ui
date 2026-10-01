import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { withTheme } from "./withThemeDecorator";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "system",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "system", icon: "browser", title: "system" },
        { value: "dark", icon: "moon", title: "dark" },
        { value: "light", icon: "sun", title: "light" },
      ],
      showName: true,
    },
  },
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
      codePanel: true,
    },
  },
  argTypes: {
    // Hide children prop from docs table - it doesn't serialize well as a control
    children: { table: { disable: true } },
  },
};

export const decorators = [withTheme];
export default preview;
