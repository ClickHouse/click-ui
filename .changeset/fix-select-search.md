---
"@clickhouse/click-ui": patch
---

Fix a few bugs by changing the way Select works with its options: instead of imperative rebuilding of several service entities,
derive them in-flow, “you might not need an effect”.

Bugs fixed:
- search now always works in Selects and matches any text that is rendered in items, including options that arrive while the menu is open
- disabled items can no longer be selected via keyboard navigation

Note: filtered-out items now stay mounted (hidden) instead of unmounting, so their rendered text stays available to search.
