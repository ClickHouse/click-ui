import { ThemeName, THEMES } from '@/theme';

// TODO: The theme should not be hard-typed
// find locations where hard-typing might be happening
export const isValidThemeName = (theme: ThemeName) =>
  [THEMES.Dark, THEMES.Light].includes(theme);

export const getFallbackThemeName = (theme: ThemeName) =>
  isValidThemeName(theme) ? theme : THEMES.Light;
