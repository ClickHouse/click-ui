// ClickUIProvider is the single public provider: it sets the theme (data-cui-theme
// + the theme React context), persists it, and wraps the toast and tooltip
// providers. The active theme is read with `useTheme` from '@/theme/ThemeContext'.

export { ClickUIProvider } from './ClickUIProvider';
export { PortalProvider } from './PortalProvider';
export { usePortalContainer, useResolvedPortalContainer } from './PortalContext';
export type { PortalContainer } from './PortalContext';
export type { PortalProviderProps } from './PortalProvider';
