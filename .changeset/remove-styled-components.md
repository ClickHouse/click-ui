---
'@clickhouse/click-ui': major
---

Remove styled-components as a dependency. click-ui no longer uses styled-components internally — every component renders from CSS Modules, and the runtime theme is now delivered through click-ui's own React context (via `ClickUIProvider`).

Breaking changes:

- `styled-components` is no longer a peer dependency. If your app doesn't use styled-components for its own code, you can remove it.
- The deprecated `linkStyles` and `StyledLinkProps` exports have been removed. Use the `Link` component with the `component` prop instead — e.g. `<Link component={RouterLink} size="md" weight="normal" to="/path">text</Link>`.
- The lower-level `ThemeProvider` export has been removed; `ClickUIProvider` is now the single provider. It already set the theme (and wraps toast/tooltip), so replace any bare `<ThemeProvider theme={…}>` with `<ClickUIProvider theme={…}>`.
