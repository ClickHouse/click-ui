// Export components
export { default as ClickUIProvider } from "./ClickUIProvider";
export { ServerClickUIProvider } from "./ServerClickUIProvider";

// Export hooks
export { useCUITheme, useClickUITheme } from "./hooks";

// Export types and interfaces
export type { ThemeName, ThemeContextValue } from "./context";

export type { ClickUIConfig, ClickUIProviderProps } from "./types";

export { DEFAULT_CONFIG } from "./types";
