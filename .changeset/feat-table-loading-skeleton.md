---
'@clickhouse/click-ui': minor
---

New `Skeleton` component: a placeholder for content that is still loading, in two shapes. `shape="text"` (the default) draws `lines` of text at a `size` of `sm` or `md`; `shape="rectangle"` draws a box of any `height`. `width` and `height` take a space key (`md`) or any CSS length, and default to filling the parent. All skeletons on a page share one shimmer sweep.

`Table` can now show placeholder rows while loading instead of a centered spinner: set `loadingVariant="skeleton"` alongside `loading`, and `skeletonRowCount` to choose how many rows (3 by default). The placeholders follow the table `size`.

Visual: unchanged by default. `loadingVariant` defaults to `spinner`, which is what `loading` has always drawn. The table also sets `aria-busy` while loading, in either variant.
