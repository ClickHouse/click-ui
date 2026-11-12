---
'@clickhouse/click-ui': patch
---

Render the `Icon` wrapper as a `span` instead of a `div` so icons used inline (for example inside `Text` or a `Link`) no longer produce invalid DOM nesting. Layout is unchanged.

Note: the rendered element of the icon wrapper changes from `div` to `span`. If your app targets that element by tag name (CSS such as `div { ... }` or DOM/snapshot assertions) rather than by class, you may need to update those selectors.
