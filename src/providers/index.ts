// TODO: Reconcile ClickUIProvider and ThemeProvider - having two public providers is confusing.
// Only one should be public. ClickUIProvider is the main composite provider that includes
// theme, toast, and tooltip providers. ThemeProvider is the lower-level styled-components
// theme provider. Consider deprecating one or making ThemeProvider internal only.

export { ClickUIProvider } from './ClickUIProvider';
export { ThemeProvider } from './ThemeProvider';
