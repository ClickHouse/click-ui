export type NestedJSONObject = {
  [key: string]: string | number | NestedJSONObject | (string | number)[];
};

// Import the generated Theme interface from token types
import type { Theme } from "./tokens/types";
export type { Theme } from "./tokens/types";

export type ThemeName = "light" | "dark" | "system";
export type ResolvedThemeName = Exclude<ThemeName, "system">;

// For backward compatibility
export type BaseThemeName = ResolvedThemeName;

// Config theme values - a superset type that includes all Theme properties
// plus any custom properties from user config.
// This is the runtime theme (base theme + config overrides merged together)
export type ConfigThemeValues = Theme & NestedJSONObject;

// Deep partial type for theme configuration (exported for advanced use cases)
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends (infer U)[]
      ? DeepPartial<U>[]
      : DeepPartial<T[P]>
    : T[P];
};

// Flexible theme type that allows arbitrary nested objects for maximum flexibility
// We use NestedJSONObject instead of DeepPartial<Theme> because:
// 1. Users need to define custom properties that don't exist in the base Theme
// 2. The actual Theme type validation happens at runtime through deepMerge
// 3. Provides better DX - no TypeScript errors for custom properties
type FlexibleTheme = NestedJSONObject;

// Helper type for users who want autocomplete for base theme properties
// Usage: const config: ThemeConfig = { theme: {...} as TypedTheme }
export type TypedTheme = DeepPartial<Theme>;

// ═══════════════════════════════════════════════════════════════
// BUILD-TIME CONFIG (Used by bundler plugins to generate CSS)
// ═══════════════════════════════════════════════════════════════

/**
 * Build-time theme tokens - processed by bundler plugin
 * These are transformed into CSS variables at build time
 */
export interface BuildTimeThemeConfig {
  // Light mode theme - accepts partial theme objects and custom properties
  theme?: FlexibleTheme;
  // Dark mode overrides - if not defined, uses theme values for dark mode too
  dark?: FlexibleTheme;
}

// ═══════════════════════════════════════════════════════════════
// RUNTIME CONFIG (Used by ClickUIProvider/ServerClickUIProvider)
// ═══════════════════════════════════════════════════════════════

/**
 * Runtime provider configuration
 * These settings control provider behavior at runtime
 */
export interface RuntimeConfig {
  storageKey?: string;
  // Tooltip configuration
  tooltipConfig?: {
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
  };
  // Toast configuration
  toastConfig?: {
    duration?: number;
    swipeDirection?: "right" | "left" | "up" | "down";
    swipeThreshold?: number;
  };
}

// ═══════════════════════════════════════════════════════════════
// COMPLETE CONFIG (Combines both build-time and runtime)
// ═══════════════════════════════════════════════════════════════

/**
 * Complete configuration for click-ui.config.ts
 * Combines both build-time theme tokens and runtime provider settings
 */
export interface ThemeConfig extends BuildTimeThemeConfig, RuntimeConfig {}

export interface ThemeContextValue {
  themeName: ThemeName;
  updateTheme: (theme: ThemeName) => void;
  isSystemTheme?: boolean;
  resolvedTheme: BaseThemeName;
  theme: Theme;
  breakpoints: Record<string, string>;
  sizes: Record<string, string>;
}
