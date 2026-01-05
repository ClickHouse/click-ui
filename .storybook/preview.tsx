import React from "react";
import type { Preview } from "@storybook/react-vite";
import "@/styles/cui-scss-theme.css";
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

const ThemeBlock: React.FC<ThemeBlockProps & { theme?: string }> = ({
  left,
  fill,
  theme = "light",
  children,
}) => (
  <div
    className={clsx(styles.cuiThemeBlock, {
      [styles.cuiLeft]: left || fill,
      [styles.cuiRight]: !left && !fill,
      [styles.cuiFill]: fill,
    })}
    style={{
      // Set color-scheme to make light-dark() CSS function work
      colorScheme: theme,
    }}
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
      theme={theme as any}
      config={{
        tooltip: { delayDuration: 100 },
        toast: { duration: 3000 },
      }}
    >
      <ThemeBlock
        fill
        theme={theme}
      >
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
};

export const decorators = [withTheme];
export default preview;
