---
"@clickhouse/click-ui": patch
---

Fix a few bugs by changing the way Select works with its options: instead of imperative rebuilding of several service entities,
derive them in-flow, “you might not need an effect”.

Bugs fixed:
- search now always works in Selects and matches any text that is rendered in items
- disabled items can no longer be selected via keyboard navigation
