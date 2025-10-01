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
import { getBaseTheme } from "@/theme/utils";
import { getThemeConfig } from "@/theme/config";
import { loadCustomConfig, deepMerge } from "@/theme/utils";
import { injectThemeStyles } from "@/theme/utils/css-generator";
import { useSystemTheme } from "@/theme/hooks/useSystemTheme";
import "@/theme/global.scss";
// Note: All CSS variables are dynamically injected via injectThemeStyles()
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

// Auto theme detection based on time
const useAutoTheme = (enabled: boolean): BaseThemeName => {
  const [autoTheme, setAutoTheme] = useState<BaseThemeName>("light");

  useEffect(() => {
    if (!enabled) return;

    const updateAutoTheme = () => {
      const hour = new Date().getHours();
      // Dark mode from 7 PM to 6 AM
      const isDarkTime = hour >= 19 || hour < 6;
      setAutoTheme(isDarkTime ? "dark" : "light");
    };

    updateAutoTheme();
    const interval = setInterval(updateAutoTheme, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [enabled]);

  return autoTheme;
};

// Theme preloader
const useThemePreloader = (themes: BaseThemeName[]) => {
  useEffect(() => {
    const preloadedThemes = new Set<BaseThemeName>();

    themes.forEach(async themeName => {
      if (preloadedThemes.has(themeName)) return;

      try {
        // Preload theme data
        getBaseTheme(themeName);
        preloadedThemes.add(themeName);

        if (process.env.NODE_ENV === "development") {
          console.log(`🎨 Preloaded theme: ${themeName}`);
        }
      } catch (error) {
        console.warn(`Failed to preload theme: ${themeName}`, error);
      }
    });
  }, [themes]);
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
  const [customConfig, setCustomConfig] = useState<ClickUIConfig | null>(null);

  // Load configurations
  const buildTimeConfig = useMemo(() => getThemeConfig(), []);
  const fileConfig = useMemo(() => {
    try {
      return (buildTimeConfig || {}) as ClickUIConfig;
    } catch (error) {
      console.warn("Failed to load theme config:", error);
      return {} as ClickUIConfig;
    }
  }, [buildTimeConfig]);

  // Merge all configurations
  const config = useMemo<ClickUIConfig>(
    () => ({
      ...DEFAULT_CONFIG,
      ...fileConfig,
      ...customConfig,
      tooltipConfig: {
        ...DEFAULT_CONFIG.tooltipConfig,
        ...fileConfig.tooltipConfig,
        ...propConfig?.tooltip,
      },
      toastConfig: {
        ...DEFAULT_CONFIG.toastConfig,
        ...fileConfig.toastConfig,
        ...propConfig?.toast,
      },
    }),
    [fileConfig, customConfig, propConfig]
  );

  // Theme detection hooks
  const systemTheme = useSystemTheme();
  const autoTheme = useAutoTheme(config.enableAutoTheme || false);

  // Theme preloading
  useThemePreloader(config.preloadThemes || []);

  // Resolve current theme
  const resolvedTheme = useMemo<BaseThemeName>(() => {
    if (!isHydrated) return fallbackTheme;

    switch (currentTheme) {
      case "system":
        return systemTheme;
      case "auto":
        return autoTheme;
      case "light":
      case "dark":
      case "classic":
        return currentTheme;
      default:
        return fallbackTheme;
    }
  }, [currentTheme, systemTheme, autoTheme, isHydrated, fallbackTheme]);

  // Sync external theme prop changes with internal state
  useEffect(() => {
    if (initialTheme && initialTheme !== currentTheme) {
      setCurrentThemeState(initialTheme);
    }
  }, [initialTheme, currentTheme]);

  // Initialize from localStorage and handle hydration
  useEffect(() => {
    const initializeTheme = async () => {
      setIsLoading(true);

      try {
        // Load custom config if needed
        if (!fileConfig && !buildTimeConfig) {
          const loadedConfig = await loadCustomConfig();
          setCustomConfig(loadedConfig);
        }

        // Only load from localStorage if no explicit theme prop is provided
        if (!initialTheme && typeof window !== "undefined") {
          const stored = localStorage.getItem(storageKey);
          const validThemes: ThemeName[] = ["light", "dark", "classic", "system", "auto"];

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

  // Build theme data with system overrides
  const { finalTheme, systemLightTheme, systemDarkTheme } = useMemo(() => {
    const baseLightTheme = getBaseTheme("light");
    const baseDarkTheme = getBaseTheme("dark");
    const baseTheme = getBaseTheme(resolvedTheme);

    let processedTheme = baseTheme;
    let lightTheme = null;
    let darkTheme = null;

    // Apply custom theme overrides
    if (config.theme) {
      processedTheme = deepMerge(processedTheme, config.theme);
    }

    // Handle system mode overrides
    if (currentTheme === "system" && config.systemModeOverrides) {
      const { light: lightOverrides, dark: darkOverrides } = config.systemModeOverrides;

      lightTheme = lightOverrides
        ? deepMerge(deepMerge(baseLightTheme, config.theme || {}), lightOverrides)
        : deepMerge(baseLightTheme, config.theme || {});

      darkTheme = darkOverrides
        ? deepMerge(deepMerge(baseDarkTheme, config.theme || {}), darkOverrides)
        : deepMerge(baseDarkTheme, config.theme || {});

      processedTheme = resolvedTheme === "dark" ? darkTheme : lightTheme;
    }

    return {
      finalTheme: processedTheme,
      systemLightTheme: lightTheme,
      systemDarkTheme: darkTheme,
    };
  }, [resolvedTheme, currentTheme, config.theme, config.systemModeOverrides]);

  // Extract breakpoints and sizes
  const breakpoints = useMemo(() => {
    const themeBreakpoints = finalTheme?.breakpoint?.sizes;
    const configBreakpoints = config.breakpoints;
    return (configBreakpoints ||
      (typeof themeBreakpoints === "object" && !Array.isArray(themeBreakpoints)
        ? themeBreakpoints
        : {})) as Record<string, string>;
  }, [config, finalTheme]);

  const sizes = useMemo(() => {
    const themeSizes = finalTheme?.sizes;
    const configSizes = config.sizes;
    return (configSizes ||
      (typeof themeSizes === "object" && !Array.isArray(themeSizes)
        ? themeSizes
        : {})) as Record<string, string>;
  }, [config, finalTheme]);

  // Theme update function with debouncing and validation
  const updateThemeInternal = useCallback(
    (newTheme: ThemeName) => {
      const validThemes: ThemeName[] = ["light", "dark", "classic", "system", "auto"];

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
      classic: "light",
      system: resolvedTheme === "dark" ? "light" : "dark",
      auto: resolvedTheme === "dark" ? "light" : "dark",
    };

    updateTheme(themeToggleMap[currentTheme] || "light");
  }, [currentTheme, resolvedTheme, updateTheme]);

  // Reset theme function
  const resetTheme = useCallback(() => {
    updateTheme(config.defaultTheme || "system");
  }, [updateTheme, config.defaultTheme]);

  // CSS injection with transitions
  useEffect(() => {
    if (!isHydrated) return;

    const isSystem = currentTheme === "system";

    try {
      injectThemeStyles(
        finalTheme,
        resolvedTheme,
        isSystem,
        systemLightTheme || undefined,
        systemDarkTheme || undefined
      );

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
      console.error("Failed to inject theme styles:", error);
    }
  }, [
    finalTheme,
    resolvedTheme,
    currentTheme,
    systemLightTheme,
    systemDarkTheme,
    isHydrated,
    enableTransitions,
    transitionDuration,
  ]);

  // Create context value
  const contextValue = useMemo<ThemeContextValue>(() => {
    return {
      // Core theme state
      themeName: currentTheme,
      resolvedTheme,
      isSystemTheme: currentTheme === "system" || currentTheme === "auto",

      // Theme management
      updateTheme,
      toggleTheme,
      resetTheme,

      // Theme data
      theme: finalTheme as ConfigThemeValues,
      breakpoints,
      sizes,

      // Utility functions
      utils: createThemeUtils(finalTheme, resolvedTheme),

      // State indicators
      isLoading,
      isHydrated,

      // Available themes
      availableThemes: ["light", "dark", "classic", "system", "auto"],
    };
  }, [
    currentTheme,
    resolvedTheme,
    updateTheme,
    toggleTheme,
    resetTheme,
    finalTheme,
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
          autoTheme,
          buildTimeConfig,
          fileConfig,
        },
      };
    }
  }, [
    enableDevTools,
    contextValue,
    config,
    systemTheme,
    autoTheme,
    buildTimeConfig,
    fileConfig,
  ]);

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
