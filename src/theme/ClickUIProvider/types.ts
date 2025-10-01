import { ReactNode } from "react";
import { TooltipProviderProps } from "@radix-ui/react-tooltip";
import { ToastProviderProps } from "@/components/Toast/Toast";
import { ThemeConfig, BaseThemeName } from "@/theme/types";
import { ThemeName, ThemeTransition } from "./context";

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
  transitionMode?: ThemeTransition;
  preloadThemes?: BaseThemeName[];
  enableAutoTheme?: boolean; // Auto-switch based on time of day

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

  // UI configuration
  config?: {
    tooltip?: Omit<TooltipProviderProps, "children">;
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
  transitionMode: "fade",
  preloadThemes: ["light", "dark"],
  enableAutoTheme: false,
  enableMemoization: true,
  debounceDelay: 100,
  enableDevTools: process.env.NODE_ENV === "development",
  logThemeChanges: process.env.NODE_ENV === "development",
  theme: {},
  systemModeOverrides: {},
  enableSystemMode: false,
  breakpoints: {},
  sizes: {},
};
