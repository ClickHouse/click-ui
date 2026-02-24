import { ThemeName, THEMES } from '@/theme';
import type { ActiveThemeName } from '@/theme/themes';

// TODO: The theme should not be hard-typed
// find locations where hard-typing might be happening
export const isValidThemeName = (theme: ThemeName): theme is ActiveThemeName =>
  ([THEMES.Dark, THEMES.Light] as string[]).includes(theme);

export const getFallbackThemeName = (theme: ThemeName): ActiveThemeName =>
  isValidThemeName(theme) ? theme : THEMES.Light;
