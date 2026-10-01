import { useState, useEffect, ReactNode } from "react";
import { Decorator } from "@storybook/react-vite";
import { ClickUIProvider } from "../src/providers";
import { useTheme } from "../src/theme/ThemeContext";

const ThemeBlock = ({
  left,
  bfill,
  children,
}: {
  left?: boolean;
  bfill?: boolean;
  children: ReactNode;
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        position: "absolute",
        top: "0.5rem",
        left: left || bfill ? 0 : "50vw",
        right: 0,
        height: "fit-content",
        bottom: 0,
        overflow: "auto",
        padding: "1rem",
        boxSizing: "border-box",
        background: theme.click.storybook.global.background,
      }}
    >
      {children}
    </div>
  );
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
      <ThemeBlock left>{children}</ThemeBlock>
    </ClickUIProvider>
  );
};

export const withTheme: Decorator = (StoryFn, context) => {
  const parameters = context.parameters;
  const themeSelection = parameters?.theme || context.globals.theme;

  return (
    <ThemeWrapper themeSelection={themeSelection}>
      <StoryFn />
    </ThemeWrapper>
  );
};
