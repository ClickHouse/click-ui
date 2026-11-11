---
'@clickhouse/click-ui': patch
---

Render the `Icon` wrapper as a `span` instead of a `div` so icons used inline (for example inside `Text` or a `Link`) no longer produce invalid DOM nesting. Layout is unchanged.
