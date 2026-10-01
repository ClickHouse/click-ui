---
'@clickhouse/click-ui': minor
---

Wrap all component styles in a single `clickui` CSS [cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) for predictable overrides. Any unlayered app style — a plain rule, a CSS Module class, or a `styled(...)` override — now beats click-ui's styles regardless of stylesheet order or selector specificity, so consumer overrides no longer depend on bundle order or `!important`. If your app uses its own layers, declare them after `clickui` (`@layer clickui, app;`). Rendering is otherwise unchanged (verified byte-for-byte against the full visual-regression suite). Requires a browser with `@layer` support (Chrome/Edge 99+, Firefox 97+, Safari 15.4+).
