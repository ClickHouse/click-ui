import type { NestedJSONObject, Theme } from "../types";

const colorValueCache = new Map<string, boolean>();

/**
 * Checks if a value is a color
 * Build-time only - uses pattern matching
 */
const isColorValue = (value: string): boolean => {
  if (!value || typeof value !== "string") {
    return false;
  }

  if (colorValueCache.has(value)) {
    return colorValueCache.get(value)!;
  }

  // Pattern matching for color detection
  const trimmed = value.trim();
  const isColor = (
    /^#[0-9A-Fa-f]{3,8}$/.test(trimmed) ||                    // Hex colors
    /^rgba?\([^)]+\)$/.test(trimmed) ||                       // rgb/rgba with any content
    /^hsla?\([^)]+\)$/.test(trimmed) ||                       // hsl/hsla with any content
    /^(lch|lab|oklab|oklch)\([^)]+\)$/.test(trimmed) ||      // Modern color spaces
    /^color\([^)]+\)$/.test(trimmed) ||                       // color() function
    trimmed.startsWith("var(--") ||                           // CSS variables
    // Named colors (basic set)
    /^(transparent|currentColor|inherit|initial|unset)$/i.test(trimmed)
  );

  colorValueCache.set(value, isColor);

  return isColor;
};

/**
 * Determines if a variable should use light-dark()
 * Only checks if BOTH values are colors - variable name doesn't matter
 */
const shouldUseLightDark = (
  _varName: string, // Not used - only value matters
  lightValue: string,
  darkValue: string
): boolean => {
  // Use light-dark() only if BOTH values are colors
  return isColorValue(lightValue) && isColorValue(darkValue);
};

/**
 * Core traverse function to convert nested theme object to flat variable map
 * Used by generateCSSVariables, themeToFlatVariables, and build plugins to avoid duplication
 *
 * @param obj - Theme or nested JSON object to traverse
 * @param prefix - Prefix for CSS variable names (default: "--")
 * @param skipFields - Fields to skip during traversal (default: ["name", "isSystem", "resolvedTheme"])
 * @returns Record of CSS variable names to their values
 */
export const traverseThemeObject = (
  obj: Theme | NestedJSONObject,
  prefix: string = "--",
  skipFields: string[] = ["name", "isSystem", "resolvedTheme"]
): Record<string, string> => {
  const vars: Record<string, string> = {};

  const traverse = (current: Theme | NestedJSONObject, path: string[] = []) => {
    Object.entries(current).forEach(([key, value]) => {
      if (skipFields.includes(key)) {
        return;
      }

      const varPath = [...path, key];

      if (typeof value === "string" || typeof value === "number") {
        const varName = `${prefix}${varPath.join("-")}`;
        vars[varName] = String(value);
      } else if (Array.isArray(value)) {
        // Handle arrays: convert each element to a CSS variable with index
        // e.g., border.radii[0] -> --border-radii-0
        value.forEach((item, index) => {
          if (typeof item === "string" || typeof item === "number") {
            const varName = `${prefix}${[...varPath, index].join("-")}`;
            vars[varName] = String(item);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        traverse(value as Theme | NestedJSONObject, varPath);
      }
    });
  };

  traverse(obj);
  return vars;
};

/**
 * Convert theme object to flat variable map
 * Used for light-dark() generation and theme overrides
 */
const themeToFlatVariables = (theme: Theme): Record<string, string> => {
  return traverseThemeObject(theme);
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
  if (lightValue === darkValue) {
    return lightValue;
  }

  if (shouldUseLightDark(varName, lightValue, darkValue)) {
    return `light-dark(${lightValue}, ${darkValue})`;
  }

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
      // Skip if both values are colors (already handled by light-dark())
      // Only add to overrides if they're non-color values that differ
      if (!isColorValue(lightValue) || !isColorValue(darkValue)) {
        lightOverrides[varName] = lightValue;
        darkOverrides[varName] = darkValue;
      }
    }
  });

  return { light: lightOverrides, dark: darkOverrides };
};
