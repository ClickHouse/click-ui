import React from "react";
import type { ThemeConfig, ThemeName } from "@/theme/types";
import { getBaseTheme, deepMerge } from "@/theme/utils";
import {
  generateLightDarkVariables,
  generateThemeOverrides,
} from "@/theme/utils/css-generator";
import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { ToastProvider, ToastProviderProps } from "@/components/Toast/Toast";

interface ServerClickUIProviderProps {
  children: React.ReactNode;
  theme?: ThemeName; // "light" | "dark" | "system"
  config?: ThemeConfig;
  // ClickUI specific props
  tooltipConfig?: Omit<TooltipProviderProps, "children">;
  toastConfig?: Omit<ToastProviderProps, "children">;
}

export const ServerClickUIProvider = ({
  children,
  theme = "light",
  config,
  tooltipConfig = {},
  toastConfig = {},
}: ServerClickUIProviderProps) => {
  // Always use light-dark() approach for all themes
  const baseLightTheme = getBaseTheme("light");
  const baseDarkTheme = getBaseTheme("dark");

  // Prepare light theme: base light theme + theme config
  const lightTheme = config?.theme
    ? deepMerge(baseLightTheme, config.theme)
    : baseLightTheme;

  // Prepare dark theme: base dark theme + theme config + dark overrides
  // If dark is not defined, theme values are used for dark mode too
  const darkTheme = config?.dark
    ? deepMerge(
        config.theme ? deepMerge(baseDarkTheme, config.theme) : baseDarkTheme,
        config.dark
      )
    : config?.theme
      ? deepMerge(baseDarkTheme, config.theme)
      : baseDarkTheme;

  const lightDarkVars = generateLightDarkVariables(lightTheme, darkTheme);
  const themeOverrides = generateThemeOverrides(lightTheme, darkTheme);

  // Generate CSS content with light-dark() for colors
  const cssVars = Object.entries(lightDarkVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");

  let themeStyles = `:root {\n${cssVars}\n}`;

  // Add non-color overrides if they exist (for variables that differ between themes)
  if (
    Object.keys(themeOverrides.light).length > 0 ||
    Object.keys(themeOverrides.dark).length > 0
  ) {
    // Light theme overrides
    if (Object.keys(themeOverrides.light).length > 0) {
      const lightOverrideCss = Object.entries(themeOverrides.light)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join("\n");
      themeStyles += `\n\n:root[data-theme="light"] {\n${lightOverrideCss}\n}`;
    }

    // Dark theme overrides
    if (Object.keys(themeOverrides.dark).length > 0) {
      const darkOverrideCss = Object.entries(themeOverrides.dark)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join("\n");
      themeStyles += `\n\n:root[data-theme="dark"] {\n${darkOverrideCss}\n}`;
    }
  }

  // Set color-scheme based on theme prop
  const isSystemMode = theme === "system";
  const colorScheme = isSystemMode ? "light dark" : theme === "dark" ? "dark" : "light";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `${themeStyles}\n:root { color-scheme: ${colorScheme}; }`,
        }}
      />
      <div data-theme={theme}>
        <ToastProvider {...toastConfig}>
          <TooltipProvider {...tooltipConfig}>{children}</TooltipProvider>
        </ToastProvider>
      </div>
    </>
  );
};
