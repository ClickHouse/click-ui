"use client";

/**
 * @deprecated This hook is deprecated and will be removed in a future version.
 * Use CSS variables for theming instead (e.g., `var(--cui-color-background-default)`).
 * Import from '@clickhouse/design-tokens/legacy/hooks' only for backward compatibility.
 */

import { useTheme } from "styled-components";
import type { Theme } from "../theme/theme.types";

export type CUIThemeType = Pick<Theme, "breakpoint" | "global" | "name" | "sizes">;

export const useCUITheme = (): CUIThemeType => {
  const theme = useTheme();
  if (!theme || Object.keys(theme).length === 0) {
    throw new Error(
      "useCUITheme must be called within a styled-components ThemeProvider. Ensure styled-components is installed and your component is wrapped in a ThemeProvider. See @clickhouse/design-topkens LEGACY.md for more details."
    );
  }
  return {
    breakpoint: theme.breakpoint,
    global: theme.global,
    name: theme.name,
    sizes: theme.sizes,
  };
};
