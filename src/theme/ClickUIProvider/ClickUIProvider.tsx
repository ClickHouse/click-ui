"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { ToastProvider } from "@/components/Toast/Toast";
import { BaseThemeName } from "@/theme/types";
import { getRuntimeConfig, getThemeValues } from "@/theme/config";
import { setThemeAttribute } from "@/theme/utils/theme-attribute";
import { useSystemColorSchemePreference } from "@/theme/hooks/useSystemColorSchemePreference";
import { ConfigThemeValues } from "@/theme/types";
import { ThemeContext } from "./context";
import type { ThemeName, ThemeContextValue } from "./context";
import type { ClickUIProviderProps, ClickUIConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

// Enhanced theme utilities
const createThemeUtils = (theme: ConfigThemeValues, resolvedTheme: BaseThemeName) => ({
  isDark: resolvedTheme === "dark",
  isLight: resolvedTheme === "light",

  getThemeValue: (path: string) => {
    const keys = path.split(".");
    let value: unknown = theme;

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }

    return value;
  },

  setThemeValue: () => {
    console.warn("setThemeValue is not yet implemented for runtime theme modification");
  },
});

// Debounce utility
const useDebounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
};

// Main provider component
export const ClickUIProvider: React.FC<ClickUIProviderProps> = ({
  children,
  theme: initialTheme,
  defaultTheme = "system",
  storageKey = "click-ui-theme",
  config: propConfig,
  enableTransitions = true,
  transitionDuration = 200,
  suppressHydrationWarning = false,
  fallbackTheme = "light",
  enableMemoization = true,
  debounceDelay = 100,
  enableDevTools = process.env.NODE_ENV === "development",
}) => {
  // State management
  const [currentTheme, setCurrentThemeState] = useState<ThemeName>(
    initialTheme || defaultTheme
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load runtime configuration (storageKey, tooltipConfig, toastConfig)
  const runtimeConfig = useMemo(() => getRuntimeConfig(), []);

  // Merge all configurations (runtime config + prop overrides)
  const config = useMemo<ClickUIConfig>(
    () => ({
      ...DEFAULT_CONFIG,
      ...runtimeConfig,
      tooltipConfig: {
        ...DEFAULT_CONFIG.tooltipConfig,
        ...runtimeConfig.tooltipConfig,
        ...propConfig?.tooltip,
      },
      toastConfig: {
        ...DEFAULT_CONFIG.toastConfig,
        ...runtimeConfig.toastConfig,
        ...propConfig?.toast,
      },
    }),
    [runtimeConfig, propConfig]
  );

  // Detect system color scheme preference
  const systemTheme = useSystemColorSchemePreference();

  // Resolve current theme
  const resolvedTheme = useMemo<BaseThemeName>(() => {
    if (!isHydrated) return fallbackTheme;

    switch (currentTheme) {
      case "system":
        return systemTheme;
      case "light":
      case "dark":
        return currentTheme;
      default:
        return fallbackTheme;
    }
  }, [currentTheme, systemTheme, isHydrated, fallbackTheme]);

  // Sync external theme prop changes with internal state
  useEffect(() => {
    if (initialTheme && initialTheme !== currentTheme) {
      setCurrentThemeState(initialTheme);
    }
  }, [initialTheme, currentTheme]);

  // Initialize from localStorage and handle hydration
  useEffect(() => {
    const initializeTheme = () => {
      setIsLoading(true);

      try {
        // Only load from localStorage if no explicit theme prop is provided
        if (!initialTheme && typeof window !== "undefined") {
          const stored = localStorage.getItem(storageKey);
          const validThemes: ThemeName[] = ["light", "dark", "system"];

          if (stored && validThemes.includes(stored as ThemeName)) {
            setCurrentThemeState(stored as ThemeName);

            if (enableDevTools) {
              console.log(`🎨 Loaded theme from storage: ${stored}`);
            }
          } else {
            // No stored theme and no explicit theme prop, use defaultTheme
            setCurrentThemeState(defaultTheme);

            if (enableDevTools) {
              console.log(`🎨 Using default theme: ${defaultTheme}`);
            }
          }
        }
      } catch (error) {
        console.warn("Failed to initialize theme:", error);
      } finally {
        setIsHydrated(true);
        setIsLoading(false);
      }
    };

    initializeTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Extract breakpoints and sizes from config
  // Theme CSS is pre-built, no need to load theme objects
  const breakpoints = useMemo(() => {
    return (config.breakpoints || {}) as Record<string, string>;
  }, [config.breakpoints]);

  const sizes = useMemo(() => {
    return (config.sizes || {}) as Record<string, string>;
  }, [config.sizes]);

  // Theme update function with debouncing and validation
  const updateThemeInternal = useCallback(
    (newTheme: ThemeName) => {
      const validThemes: ThemeName[] = ["light", "dark", "system"];

      if (!validThemes.includes(newTheme)) {
        console.warn(`Invalid theme: ${newTheme}. Falling back to system.`);
        newTheme = "system";
      }

      setCurrentThemeState(newTheme);

      // Persist to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, newTheme);

          if (config.logThemeChanges) {
            console.log(`🎨 Theme changed to: ${newTheme}`);
          }
        } catch (error) {
          console.warn("Failed to save theme to localStorage:", error);
        }
      }
    },
    [storageKey, config.logThemeChanges]
  );

  const debouncedUpdateTheme = useDebounce(updateThemeInternal, debounceDelay);
  const updateTheme = enableMemoization ? debouncedUpdateTheme : updateThemeInternal;

  // Theme toggle function
  const toggleTheme = useCallback(() => {
    const themeToggleMap: Record<ThemeName, ThemeName> = {
      light: "dark",
      dark: "light",
      system: resolvedTheme === "dark" ? "light" : "dark",
    };

    updateTheme(themeToggleMap[currentTheme] || "light");
  }, [currentTheme, resolvedTheme, updateTheme]);

  // Reset theme function
  const resetTheme = useCallback(() => {
    updateTheme(config.defaultTheme || "system");
  }, [updateTheme, config.defaultTheme]);

  // Apply theme switching with pre-built CSS
  useEffect(() => {
    if (!isHydrated) return;

    const isSystem = currentTheme === "system";

    try {
      // Set theme attribute - CSS is pre-built and loaded via import
      setThemeAttribute(resolvedTheme, isSystem);

      if (enableDevTools) {
        console.log(
          `🎨 Theme switched to: ${resolvedTheme}${isSystem ? " (system)" : ""}`
        );
      }

      // Apply transitions if enabled
      if (enableTransitions && typeof document !== "undefined") {
        const root = document.documentElement;
        root.style.setProperty(
          "--cui-theme-transition-duration",
          `${transitionDuration}ms`
        );

        if (!root.style.getPropertyValue("--cui-theme-transition")) {
          root.style.setProperty(
            "--cui-theme-transition",
            `background-color ${transitionDuration}ms ease-in-out, color ${transitionDuration}ms ease-in-out`
          );
        }
      }
    } catch (error) {
      console.error("Failed to apply theme:", error);
    }
  }, [
    resolvedTheme,
    currentTheme,
    isHydrated,
    enableTransitions,
    transitionDuration,
    enableDevTools,
  ]);

  // Load merged theme values (base theme + config overrides)
  const themeValues = useMemo(() => {
    return getThemeValues(resolvedTheme);
  }, [resolvedTheme]);

  // Create context value
  const contextValue = useMemo<ThemeContextValue>(() => {
    return {
      // Core theme state
      themeName: currentTheme,
      resolvedTheme,
      isSystemTheme: currentTheme === "system",

      // Theme management
      updateTheme,
      toggleTheme,
      resetTheme,

      // Theme data - includes base theme + config overrides
      theme: themeValues,
      breakpoints,
      sizes,

      // Utility functions
      utils: createThemeUtils(themeValues, resolvedTheme),

      // State indicators
      isLoading,
      isHydrated,

      // Available themes
      availableThemes: ["light", "dark", "system"],
    };
  }, [
    currentTheme,
    resolvedTheme,
    updateTheme,
    toggleTheme,
    resetTheme,
    themeValues,
    breakpoints,
    sizes,
    isLoading,
    isHydrated,
  ]);

  // Dev tools
  useEffect(() => {
    if (enableDevTools && typeof window !== "undefined") {
      (window as unknown as { clickUITheme: unknown }).clickUITheme = {
        current: contextValue,
        config,
        debug: {
          systemTheme,
          runtimeConfig,
        },
      };
    }
  }, [enableDevTools, contextValue, config, systemTheme, runtimeConfig]);

  // Render provider
  const content = (
    <ThemeContext.Provider value={contextValue}>
      <ToastProvider {...config.toastConfig}>
        <TooltipProvider {...config.tooltipConfig}>{children}</TooltipProvider>
      </ToastProvider>
    </ThemeContext.Provider>
  );

  // Wrap with error boundary and hydration protection
  return suppressHydrationWarning ? (
    <div suppressHydrationWarning>
      <Suspense fallback={<div>Loading theme...</div>}>{content}</Suspense>
    </div>
  ) : (
    <Suspense fallback={<div>Loading theme...</div>}>{content}</Suspense>
  );
};

export default ClickUIProvider;
