---
'@clickhouse/click-ui': patch
---

`Table` header content for sortable columns, and for columns with an `onClick`, now renders as a `<button>`: keyboard users reach it with Tab and sort with Enter or Space, and the sorted column exposes `aria-sort`. A sorted header's accessible name no longer ends in "arrow-down"; the direction is in `aria-sort`. Column resizers report their width and range to assistive technology. Header labels of sortable or clickable columns must not contain interactive content. Headers marked `isSortable` on a table without `onSort` no longer show a pointer cursor. Visual: unchanged, except a focus ring on a focused sortable header.
