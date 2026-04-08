'use client';

/**
 * @deprecated This hook is deprecated and will be removed in a future version.
 * Use CSS variables for theming instead (e.g., `var(--cui-color-background-default)`).
 * Import from '@clickhouse/design-tokens/legacy/hooks' only for backward compatibility.
 */

import { useTheme } from 'styled-components';
import type { Theme } from '../theme/theme.types';

export type CUIThemeType = Pick<Theme, 'breakpoint' | 'global' | 'name' | 'sizes'>;

export const useCUITheme = (): CUIThemeType => {
  const theme = useTheme();
  return {
    breakpoint: theme.breakpoint,
    global: theme.global,
    name: theme.name,
    sizes: theme.sizes,
  };
};
