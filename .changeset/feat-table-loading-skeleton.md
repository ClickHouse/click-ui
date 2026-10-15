---
'@clickhouse/click-ui': minor
---

New `Skeleton` component: a placeholder for content that is still loading, in two shapes. `shape="text"` (the default) draws `lines` of text, each as tall as a line of `Text` at the same `size` (`sm` or `md`); `shape="rectangle"` draws a box of any `height`. `width` and `height` take any CSS value and default to filling the parent. Skeletons on screen together share one shimmer sweep; with reduced motion the fill is static.

`Table` can now show placeholder rows while loading instead of a centered spinner: set `loadingVariant="skeleton"` alongside `loading`, and `skeletonRowCount` to choose how many rows (3 by default). The placeholders follow the table's `rowHeight`.

Visual: unchanged by default. `loadingVariant` defaults to `spinner`, which is what `loading` has always drawn. The table also sets `aria-busy` while loading, in either variant.
