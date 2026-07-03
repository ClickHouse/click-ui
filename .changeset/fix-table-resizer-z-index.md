---
'@clickhouse/click-ui': patch
---

`Table` column resize handles no longer render on top of portaled overlays (dropdowns, flyouts). The handle's positive `z-index` was lifting the delimiter above the page overlay layer; it's redundant for stacking above the header content, so it has been removed.
