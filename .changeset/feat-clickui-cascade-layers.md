---
'@clickhouse/click-ui': minor
---

Wrap all component styles in a `clickui` CSS cascade layer for predictable overrides. Any unlayered app style (or a layer you declare after `clickui`) now beats click-ui's styles regardless of stylesheet order or specificity, so consumer overrides no longer depend on bundle order or specificity hacks. Internally this removes the `:where()` bases, doubled-class boosts, and `:not()` specificity chains; rendering is unchanged (verified against the full visual-regression suite). Requires a browser with `@layer` support (Chrome/Edge 99+, Firefox 97+, Safari 15.4+).
