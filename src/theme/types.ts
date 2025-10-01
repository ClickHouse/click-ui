export type NestedJSONObject = {
  [key: string]: string | number | NestedJSONObject;
};

// Import the generated Theme interface from token types
import type { Theme } from "./tokens/types";
export type { Theme } from "./tokens/types";

export type ThemeName = "light" | "dark" | "classic" | "system";
export type ResolvedThemeName = Exclude<ThemeName, "system">;

// For backward compatibility
export type BaseThemeName = ResolvedThemeName;

// Config theme values (from ClickUIProvider/types.ts)
export type ConfigThemeValues = Theme | NestedJSONObject;

// Deep partial type for theme configuration
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends (infer U)[]
      ? DeepPartial<U>[]
      : DeepPartial<T[P]>
    : T[P];
};

// Build-time config to support system mode overrides
export interface ThemeConfig {
  // Simplified theme override - now accepts partial theme objects
  theme?: DeepPartial<Theme>;
  // System mode specific overrides - also partial
  systemModeOverrides?: {
    light?: DeepPartial<Theme>;
    dark?: DeepPartial<Theme>;
  };
  storageKey?: string;
  // Enable automatic dark mode switching
  enableSystemMode?: boolean;
}

export interface ThemeContextValue {
  themeName: ThemeName;
  updateTheme: (theme: ThemeName) => void;
  isSystemTheme?: boolean;
  resolvedTheme: BaseThemeName;
  theme: Theme;
  breakpoints: Record<string, string>;
  sizes: Record<string, string>;
}
