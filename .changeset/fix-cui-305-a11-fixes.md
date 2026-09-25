---
'@clickhouse/click-ui': patch
---

Dismissible banner `Alert`s no longer render an empty, unnamed button before their content; `IconButton` and `ButtonGroup` drop a redundant `role="button"` attribute (select them with `getByRole('button')` instead of `[role="button"]`), and `IconButton` now honors a consumer-supplied `role`.
