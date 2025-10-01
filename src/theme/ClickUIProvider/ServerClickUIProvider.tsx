import React from "react";
import type { BaseThemeName, ThemeConfig } from "@/theme/types";
import { getBaseTheme } from "@/theme/utils";
import { generateCSSVariables } from "@/theme/utils/css-generator";
import { deepMerge } from "@/theme/utils";
import {
  Provider as TooltipProvider,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { ToastProvider, ToastProviderProps } from "@/components/Toast/Toast";

interface ServerClickUIProviderProps {
  children: React.ReactNode;
  theme?: BaseThemeName;
  config?: ThemeConfig;
  enableSystemMode?: boolean;
  // ClickUI specific props
  tooltipConfig?: Omit<TooltipProviderProps, "children">;
  toastConfig?: Omit<ToastProviderProps, "children">;
}

export const ServerClickUIProvider = ({
  children,
  theme = "light",
  config,
  enableSystemMode = false,
  tooltipConfig = {},
  toastConfig = {},
}: ServerClickUIProviderProps) => {
  let themeStyles = "";

  if (enableSystemMode && config?.systemModeOverrides) {
    // Generate CSS for both light and dark modes
    const baseLightTheme = getBaseTheme("light");
    const baseDarkTheme = getBaseTheme("dark");

    const lightTheme = config.systemModeOverrides.light
      ? deepMerge(
          deepMerge(baseLightTheme, config.theme || {}),
          config.systemModeOverrides.light
        )
      : deepMerge(baseLightTheme, config.theme || {});

    const darkTheme = config.systemModeOverrides.dark
      ? deepMerge(
          deepMerge(baseDarkTheme, config.theme || {}),
          config.systemModeOverrides.dark
        )
      : deepMerge(baseDarkTheme, config.theme || {});

    const lightVars = generateCSSVariables(lightTheme);
    const darkVars = generateCSSVariables(darkTheme);

    themeStyles = `
/* Light mode */
@media (prefers-color-scheme: light) {
  :root {
${lightVars}  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
${darkVars}  }
}

/* Explicit theme overrides */
:root[data-theme="light"] {
${lightVars}}

:root[data-theme="dark"] {
${darkVars}}`;
  } else {
    // Single theme mode
    const baseTheme = getBaseTheme(theme);
    const finalTheme = config?.theme ? deepMerge(baseTheme, config.theme) : baseTheme;
    const cssVars = generateCSSVariables(finalTheme);
    themeStyles = `:root[data-theme="${theme}"] {\n${cssVars}}`;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <div data-theme={enableSystemMode ? "system" : theme}>
        <ToastProvider {...toastConfig}>
          <TooltipProvider {...tooltipConfig}>{children}</TooltipProvider>
        </ToastProvider>
      </div>
    </>
  );
};
