import { useTheme } from 'styled-components';
import type { Prettify } from './tokens/types';
import type { ThemeName } from './theme.types';
import type { Theme } from './themes';

export { ClickUIProvider } from './ClickUIProvider';

export type { ThemeName };
export type { Theme };
export { themes } from './themes';

// For backward compatibility: CUIThemeType is the public subset (like v0.0.244)
export type CUIThemeType = Prettify<{
  breakpoint: Theme['breakpoint'];
  global: Theme['global'];
  sizes: Theme['sizes'];
  name?: ThemeName;
}>;

// Alias for consistency
export type PublicTheme = CUIThemeType;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const useCUITheme = (): PublicTheme => {
  const theme = useTheme();
  return {
    breakpoint: theme.breakpoint,
    global: theme.global,
    name: theme.name as ThemeName | undefined,
    sizes: theme.sizes,
  };
};

export { useCUITheme };
