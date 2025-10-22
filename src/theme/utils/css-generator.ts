import type { NestedJSONObject, Theme } from "../types";

// Cache for color detection results
const colorValueCache = new Map<string, boolean>();

/**
 * Fast check if variable name suggests it's a color
 */
const isColorVariable = (varName: string): boolean => {
  const colorKeywords = ["color", "background", "bg", "stroke", "border", "fill", "shadow"];
  return colorKeywords.some(keyword => varName.toLowerCase().includes(keyword));
};

/**
 * Checks if a value is a color using CSS.supports() with caching
 * Only available in browser context
 */
const isColorValue = (value: string): boolean => {
  if (typeof window === "undefined" || !value || typeof value !== "string") {
    return false;
  }

  // Check cache first
  if (colorValueCache.has(value)) {
    return colorValueCache.get(value)!;
  }

  // Test if the browser accepts this value as a color
  // One check is enough - all CSS color properties accept the same color values
  const isColor = CSS.supports("color", value);

  // Cache the result
  colorValueCache.set(value, isColor);

  return isColor;
};

/**
 * Determines if a variable should use light-dark()
 * Uses fast name check first, then validates with CSS.supports()
 */
const shouldUseLightDark = (
  varName: string,
  lightValue: string,
  darkValue: string
): boolean => {
  // Fast path: check name first
  if (!isColorVariable(varName)) {
    // If name doesn't suggest color, still check value as fallback
    // but only if we're in browser context
    if (typeof window === "undefined") return false;
    return isColorValue(lightValue) && isColorValue(darkValue);
  }

  // Name suggests color, verify with CSS.supports()
  return isColorValue(lightValue) || isColorValue(darkValue);
};

export const generateCSSVariables = (obj: Theme | NestedJSONObject): string => {
  let css = "";

  const traverse = (current: Theme | NestedJSONObject, path: string[] = []) => {
    Object.entries(current).forEach(([key, value]) => {
      // Skip non-variable fields
      if (key === "name" || key === "isSystem" || key === "resolvedTheme") {
        return;
      }

      const varPath = [...path, key];

      if (typeof value === "string" || typeof value === "number") {
        const varName = `--${varPath.join("-")}`;
        css += `  ${varName}: ${value};\n`;
      } else if (Array.isArray(value)) {
        // Handle arrays: convert each element to a CSS variable with index
        // e.g., border.radii[0] -> --border-radii-0
        value.forEach((item, index) => {
          if (typeof item === "string" || typeof item === "number") {
            const varName = `--${[...varPath, index].join("-")}`;
            css += `  ${varName}: ${item};\n`;
          }
        });
      } else if (typeof value === "object" && value !== null) {
        traverse(value as Theme | NestedJSONObject, varPath);
      }
    });
  };

  traverse(obj);
  return css;
};

// Helper to convert theme object to flat variable map
export const themeToFlatVariables = (theme: Theme): Record<string, string> => {
  const vars: Record<string, string> = {};

  const traverse = (current: Theme | NestedJSONObject, path: string[] = []) => {
    Object.entries(current).forEach(([key, value]) => {
      // Skip non-variable fields
      if (key === "name" || key === "isSystem" || key === "resolvedTheme") {
        return;
      }

      const varPath = [...path, key];

      if (typeof value === "string" || typeof value === "number") {
        const varName = `--${varPath.join("-")}`;
        vars[varName] = String(value);
      } else if (Array.isArray(value)) {
        // Handle arrays: convert each element to a CSS variable with index
        // e.g., border.radii[0] -> --border-radii-0
        value.forEach((item, index) => {
          if (typeof item === "string" || typeof item === "number") {
            const varName = `--${[...varPath, index].join("-")}`;
            vars[varName] = String(item);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        traverse(value as Theme | NestedJSONObject, varPath);
      }
    });
  };

  traverse(theme);
  return vars;
};

/**
 * Process a variable and determine its CSS value based on light/dark themes
 * Returns the appropriate CSS value (either direct value or light-dark() function)
 */
const processVariable = (
  varName: string,
  lightValue: string,
  darkValue: string
): string => {
  // Optimization: if both values are identical, declare it once
  if (lightValue === darkValue) {
    return lightValue;
  }

  // Only use light-dark() for color values
  if (shouldUseLightDark(varName, lightValue, darkValue)) {
    return `light-dark(${lightValue}, ${darkValue})`;
  }

  // Non-color values: use light theme value
  // Note: If you need different non-color values per theme,
  // you'll need to handle them separately with [data-theme] selectors
  return lightValue;
};

/**
 * Generate CSS variables with light-dark() for colors and fallback handling for non-colors
 * Returns an object with base variables and any theme-specific overrides needed
 */
export const generateLightDarkVariables = (
  lightTheme: Theme,
  darkTheme: Theme
): Record<string, string> => {
  const lightVars = themeToFlatVariables(lightTheme);
  const darkVars = themeToFlatVariables(darkTheme);
  const lightDarkVars: Record<string, string> = {};

  // Process all light theme variables
  Object.keys(lightVars).forEach(varName => {
    const lightValue = lightVars[varName];
    const darkValue = darkVars[varName] || lightValue;
    lightDarkVars[varName] = processVariable(varName, lightValue, darkValue);
  });

  // Add any dark-only variables
  Object.keys(darkVars).forEach(varName => {
    if (!lightDarkVars[varName]) {
      const darkValue = darkVars[varName];
      const lightValue = lightVars[varName] || darkValue;
      lightDarkVars[varName] = processVariable(varName, lightValue, darkValue);
    }
  });

  return lightDarkVars;
};

/**
 * Generate separate theme-specific overrides for non-color variables that differ
 * This is needed when non-color values differ between themes and light-dark() can't be used
 */
export const generateThemeOverrides = (
  lightTheme: Theme,
  darkTheme: Theme
): { light: Record<string, string>; dark: Record<string, string> } => {
  const lightVars = themeToFlatVariables(lightTheme);
  const darkVars = themeToFlatVariables(darkTheme);
  const lightOverrides: Record<string, string> = {};
  const darkOverrides: Record<string, string> = {};

  // Find non-color variables that have different values
  Object.keys(lightVars).forEach(varName => {
    const lightValue = lightVars[varName];
    const darkValue = darkVars[varName];

    if (darkValue && lightValue !== darkValue) {
      // Skip if it's a color (already handled by light-dark())
      if (!isColorVariable(varName)) {
        lightOverrides[varName] = lightValue;
        darkOverrides[varName] = darkValue;
      }
    }
  });

  return { light: lightOverrides, dark: darkOverrides };
};

export const injectThemeStyles = (
  theme: Theme,
  resolvedTheme: string,
  isSystem = false,
  systemLightTheme?: Theme,
  systemDarkTheme?: Theme,
  lightTheme?: Theme,
  darkTheme?: Theme
): void => {
  if (typeof window === "undefined") return;

  const rootElement = document.documentElement;

  // Always use light-dark() approach for efficient theme switching
  let styleEl = document.getElementById("click-ui-theme-vars");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "click-ui-theme-vars";
    document.head.appendChild(styleEl);
  }

  // Use provided light/dark themes or fall back to system themes
  const finalLightTheme = lightTheme || systemLightTheme || theme;
  const finalDarkTheme = darkTheme || systemDarkTheme || theme;

  const lightDarkVars = generateLightDarkVariables(finalLightTheme, finalDarkTheme);
  const themeOverrides = generateThemeOverrides(finalLightTheme, finalDarkTheme);

  // Generate CSS content with light-dark() for colors
  const cssVars = Object.entries(lightDarkVars)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join("\n");

  let cssContent = `:root {\n${cssVars}\n}`;

  // Add non-color overrides if they exist (for variables that differ between themes)
  if (Object.keys(themeOverrides.light).length > 0 || Object.keys(themeOverrides.dark).length > 0) {
    // Light theme overrides
    if (Object.keys(themeOverrides.light).length > 0) {
      const lightOverrideCss = Object.entries(themeOverrides.light)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join("\n");
      cssContent += `\n\n:root[data-theme="light"] {\n${lightOverrideCss}\n}`;
    }

    // Dark theme overrides
    if (Object.keys(themeOverrides.dark).length > 0) {
      const darkOverrideCss = Object.entries(themeOverrides.dark)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join("\n");
      cssContent += `\n\n:root[data-theme="dark"] {\n${darkOverrideCss}\n}`;
    }
  }

  styleEl.textContent = cssContent;

  // Update only the color-scheme property to switch themes
  if (isSystem) {
    rootElement.style.colorScheme = "light dark";
    rootElement.removeAttribute("data-theme");
  } else {
    const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
    rootElement.style.colorScheme = colorScheme;
    rootElement.setAttribute("data-theme", resolvedTheme);
  }
};
