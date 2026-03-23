---
'@clickhouse/click-ui': minor
---

The `useLayoutEffect` watching `headers.length` wasn't triggered when headers were reordered (e.g., in sysadmin EntitiesTable with column selection), causing Column widths to be misaligned after reordering, NaN values appearing during resize operations and an incorrect null check (`-1 !== null`) that was always true.
