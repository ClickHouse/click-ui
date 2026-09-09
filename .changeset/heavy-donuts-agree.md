---
"@clickhouse/click-ui": patch
---

`Table` accepts a new `tableLayout` prop controlling its layout. Possible values: `'auto'`, `'fixed'`. Changes the default from
`table-layout: fixed` to `table-layout: auto`, making tables adjust to their contents better. When overflown, tables gain horizontal scroll
instead of squishing their contents.
