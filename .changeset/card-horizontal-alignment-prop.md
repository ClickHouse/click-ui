---
"@clickhouse/click-ui": minor
---

Add `alignment` prop to `CardHorizontal` to support top-aligned content

Adds an optional `alignment` prop (`'center' | 'top'`, default `'center'`) to
`CardHorizontal`. The default preserves existing behaviour. Use `alignment="top"`
to pin content to the top edge — useful in side-by-side layouts where cards have
different content heights and centre-alignment causes visual misalignment.
