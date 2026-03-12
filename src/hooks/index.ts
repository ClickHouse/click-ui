export { useToast } from './useToast';
export { useInitialTheme } from './useInitialTheme';
export type { UseThemeParams } from './useInitialTheme';

/**
 * @deprecated This hook is deprecated and will be removed in a future version.
 * Use CSS variables for theming instead (e.g., `var(--click-global-color-text-default)`).
 * For theme name, use the `useInitialTheme` hook or access the theme context directly.
 */
export { useCUITheme } from './useCUITheme';

/**
 * @deprecated This type is deprecated and will be removed in a future version.
 */
export type { CUIThemeType } from './useCUITheme';
