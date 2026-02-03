import { useState, useEffect, ReactNode } from "react";
import type { Preview } from "@storybook/react-vite";
import { Decorator } from "@storybook/react-vite";
import { styled } from "styled-components";
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

const getSystemTheme = (): "dark" | "light" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark";
};

interface ThemeWrapperProps {
  themeSelection: string | undefined;
  children: ReactNode;
}

const ThemeWrapper = ({ themeSelection, children }: ThemeWrapperProps) => {
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(getSystemTheme);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Resolve the actual theme: handle "system" and fallback for undefined/null
  const theme =
    themeSelection === "system" || !themeSelection ? systemTheme : themeSelection;

  return (
    <ClickUIProvider theme={theme} config={{ tooltip: { delayDuration: 0 } }}>
      <ThemeBlock $left>{children}</ThemeBlock>
    </ClickUIProvider>
  );
};

const withTheme: Decorator = (StoryFn, context) => {
  const parameters = context.parameters;
  const themeSelection = parameters?.theme || context.globals.theme;

  return (
    <ThemeWrapper themeSelection={themeSelection}>
      <StoryFn />
    </ThemeWrapper>
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
  },
  argTypes: {
    // Hide children prop from docs table - it doesn't serialize well as a control
    children: { table: { disable: true } },
  },
};

export const decorators = [withTheme];
export default preview;
