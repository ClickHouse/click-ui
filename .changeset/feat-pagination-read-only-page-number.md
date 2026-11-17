---
'@clickhouse/click-ui': minor
---

Add a `readOnlyPageNumber` prop to `Pagination`. When set, the page number shows as text instead of an input, and the page changes only through the previous and next buttons.

Visual: unchanged unless `readOnlyPageNumber` is set. With it, the page number input is replaced by plain text, for example "3 of 10".
