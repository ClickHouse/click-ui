---
'@clickhouse/click-ui': patch
---

Show a visible focus ring on the `secondary`, `empty` and `danger` variants of `Button` when they're focused with the keyboard. Their ring came from the variant's stroke token, which was transparent or well under 3:1 contrast, so it was hard or impossible to see. They now use the same ring as `IconButton`, `Checkbox` and the other form controls. The `primary` variant is unchanged.
