'use client';

import { useTheme } from 'styled-components';
import type { Theme } from '@/theme/theme.types';

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
