import React from "react";
import type { Preview } from "@storybook/react-vite";
// Static CSS variables - will be overridden by dynamic theme injection
import { Decorator } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { ClickUIProvider } from "@/theme/ClickUIProvider";
import clsx from "clsx";
import styles from "./preview.module.scss";

interface ThemeBlockProps {
  left?: boolean;
  fill?: boolean;
  children: React.ReactNode;
}

const ThemeBlock: React.FC<ThemeBlockProps> = ({ left, fill, children }) => (
  <div
    className={clsx(styles.cuiThemeBlock, {
      [styles.cuiLeft]: left || fill,
      [styles.cuiRight]: !left && !fill,
      [styles.cuiFill]: fill,
    })}
  >
    {children}
  </div>
);

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "dark",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light" },
        { value: "dark", icon: "moon", title: "Dark" },
        { value: "system", icon: "browser", title: "System" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};
const withTheme: Decorator = (StoryFn, context) => {
  const parameters = context.parameters;
  const theme = parameters?.theme || context.globals.theme || "light";

  return (
    <ClickUIProvider
      key={`storybook-theme-${theme}`}
      theme={theme}
      defaultTheme="light"
      enableTransitions={true}
      transitionDuration={200}
      enableDevTools={true}
      fallbackTheme="light"
      config={{
        tooltip: { delayDuration: 100 },
        toast: { duration: 3000 },
        preloadThemes: ["light", "dark", "classic"],
        enableAutoTheme: false,
        logThemeChanges: true,
      }}
    >
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <ThemeBlock fill>
          <StoryFn />
        </ThemeBlock>
      </div>
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
      codePanel: true,
    },
    backgrounds: {
      default: "click-ui",
      values: [
        {
          name: "click-ui",
          value: "var(--click-storybook-global-background)",
        },
        {
          name: "light",
          value: "var(--click-storybook-global-background)",
        },
        {
          name: "dark",
          value: "var(--click-storybook-global-background)",
        },
      ],
    },
  },
  argTypes: {
    // Hide children prop from docs table - it doesn't serialize well as a control
    children: { table: { disable: true } },
  },
};

export const decorators = [withTheme];
export default preview;
