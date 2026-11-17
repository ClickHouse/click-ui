---
'@clickhouse/click-ui': minor
---

Add a `pageNumberMode` prop to `Pagination`, `'input'` by default. With `'text'`, the page number shows as text instead of an input, and the page changes only through the previous and next buttons.

Visual: unchanged unless `pageNumberMode` is `'text'`. Then the page number input is replaced by plain text, for example "3 of 10".
