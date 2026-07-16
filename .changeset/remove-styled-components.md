---
'@clickhouse/click-ui': major
---

Remove styled-components as a dependency. click-ui no longer uses styled-components internally — every component renders from CSS Modules, and the runtime theme is now delivered through click-ui's own React context (`ClickUIProvider`/`ThemeProvider` are unchanged from a consumer's perspective).

Breaking changes:

- `styled-components` is no longer a peer dependency. If your app doesn't use styled-components for its own code, you can remove it.
- The deprecated `linkStyles` and `StyledLinkProps` exports have been removed. Use the `Link` component with the `component` prop instead — e.g. `<Link component={RouterLink} size="md" weight="normal" to="/path">text</Link>`.
