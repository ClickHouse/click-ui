import React from "react";
import type { BaseThemeName, ThemeConfig } from "@/theme/types";
import { getBaseTheme, deepMerge } from "@/theme/utils";
import { generateLightDarkVariables } from "@/theme/utils/css-generator";
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
  // Always use light-dark() approach for all themes
  const baseLightTheme = getBaseTheme("light");
  const baseDarkTheme = getBaseTheme("dark");

  // Prepare light and dark themes with config overrides
  let lightTheme = config?.theme
    ? deepMerge(baseLightTheme, config.theme)
    : baseLightTheme;
  let darkTheme = config?.theme
    ? deepMerge(baseDarkTheme, config.theme)
    : baseDarkTheme;

  // Apply system mode overrides if available
  if (config?.systemModeOverrides) {
    if (config.systemModeOverrides.light) {
      lightTheme = deepMerge(lightTheme, config.systemModeOverrides.light);
    }
    if (config.systemModeOverrides.dark) {
      darkTheme = deepMerge(darkTheme, config.systemModeOverrides.dark);
    }
  }

  const lightDarkVars = generateLightDarkVariables(lightTheme, darkTheme);

  // Generate CSS content with light-dark()
  const cssVars = Object.entries(lightDarkVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");

  const themeStyles = `:root {\n${cssVars}\n}`;

  // Set color-scheme based on mode
  const colorScheme = enableSystemMode ? "light dark" : (theme === "dark" ? "dark" : "light");
  const dataTheme: BaseThemeName | "system" = enableSystemMode ? "system" : theme;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `${themeStyles}\n:root { color-scheme: ${colorScheme}; }`,
        }}
      />
      <div data-theme={dataTheme}>
        <ToastProvider {...toastConfig}>
          <TooltipProvider {...tooltipConfig}>{children}</TooltipProvider>
        </ToastProvider>
      </div>
    </>
  );
};
