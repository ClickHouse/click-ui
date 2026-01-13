import { ReactNode } from "react";
import { TooltipProviderProps } from "@radix-ui/react-tooltip";
import { ToastProviderProps } from "@/components/Toast/Toast";
import { ThemeConfig, BaseThemeName } from "@/theme/types";
import { ThemeName } from "./context";

// Enhanced configuration interface
export interface ClickUIConfig extends ThemeConfig {
  // Core config
  defaultTheme?: ThemeName;
  storageKey?: string;

  // UI Provider configs
  tooltipConfig?: Omit<TooltipProviderProps, "children">;
  toastConfig?: Omit<ToastProviderProps, "children">;

  // Advanced features
  enableTransitions?: boolean;
  transitionDuration?: number;
  preloadThemes?: BaseThemeName[];

  // Performance
  enableMemoization?: boolean;
  debounceDelay?: number;

  // Development
  enableDevTools?: boolean;
  logThemeChanges?: boolean;

  // Layout
  breakpoints?: Record<string, string>;
  sizes?: Record<string, string>;
}

// Props interface
export interface ClickUIProviderProps {
  children: ReactNode;

  // Theme configuration
  theme?: ThemeName;
  defaultTheme?: ThemeName;
  storageKey?: string;

  /**
   * Theme variation to use. Currently only "default" is supported.
   * Future variations may include "contrast" for high-contrast themes.
   * @default "default"
   */
  variation?: "default";

  /**
   * UI provider configuration
   *
   * @deprecated Since v0.1.0. Use ClickUIProviders component instead.
   *
   * Toast and Tooltip configuration has been separated to ClickUIProviders
   * to enable true React Server Component support.
   *
   * @example
   * ```tsx
   * // Before (deprecated):
   * <ClickUIProvider
   *   theme="system"
   *   config={{
   *     tooltip: { delayDuration: 100 },
   *     toast: { duration: 3000 }
   *   }}
   * >
   *   {children}
   * </ClickUIProvider>
   *
   * // After (recommended):
   * <ClickUIProvider theme="system">
   *   <ClickUIProviders
   *     tooltipConfig={{ delayDuration: 100 }}
   *     toastConfig={{ duration: 3000 }}
   *   >
   *     {children}
   *   </ClickUIProviders>
   * </ClickUIProvider>
   * ```
   */
  config?: {
    /** @deprecated Use ClickUIProviders tooltipConfig prop instead */
    tooltip?: Omit<TooltipProviderProps, "children">;
    /** @deprecated Use ClickUIProviders toastConfig prop instead */
    toast?: Omit<ToastProviderProps, "children">;
  };

  // Advanced options
  enableTransitions?: boolean;
  transitionDuration?: number;
  suppressHydrationWarning?: boolean;
  fallbackTheme?: BaseThemeName;

  // Performance options
  enableMemoization?: boolean;
  debounceDelay?: number;

  // Development
  enableDevTools?: boolean;
}

// Default configuration
export const DEFAULT_CONFIG: Required<ClickUIConfig> = {
  defaultTheme: "system",
  storageKey: "click-ui-theme",
  tooltipConfig: { delayDuration: 100 },
  toastConfig: { duration: 4000 },
  enableTransitions: true,
  transitionDuration: 200,
  preloadThemes: ["light", "dark"],
  enableMemoization: true,
  debounceDelay: 100,
  enableDevTools: process.env.NODE_ENV === "development",
  logThemeChanges: process.env.NODE_ENV === "development",
  theme: {},
  dark: {},
  breakpoints: {},
  sizes: {},
};
