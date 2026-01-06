// ============================================================================
// TYPE UTILITIES
// ============================================================================
// Utility types for working with design tokens and theme objects

/**
 * Prettify - Expands object types in IDE tooltips for better readability
 * Recursively flattens intersection types to show the actual structure
 */
export type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & {};

/**
 * GetTypes - Extracts TypeScript types from JSON token values
 * Recursively traverses the token object and infers proper types
 * Handles arrays and nested objects correctly
 */
export type GetTypes<T> = Prettify<
  T extends (infer U)[]
    ? { [I in keyof T]: U extends object ? GetTypes<U> : U }
    : T extends object
      ? {
          [K in keyof T]: T[K] extends (infer U)[]
            ? { [I in keyof T[K]]: U extends object ? GetTypes<U> : U }
            : T[K] extends object
              ? GetTypes<T[K]>
              : T[K];
        }
      : T
>;

// ============================================================================
// THEME TYPES - Generated from token values
// ============================================================================
// Generate types directly from the TypeScript token files
// This ensures types are always accurate and in sync with the actual tokens

import type lightTokens from "./variables.light";
import type darkTokens from "./variables.dark";

// Extract the theme structure from the light tokens
export type Theme = GetTypes<typeof lightTokens>;

// Ensure dark tokens are compatible
export type DarkTheme = GetTypes<typeof darkTokens>;
