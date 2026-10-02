---
'@clickhouse/click-ui': minor
---

New `Skeleton` component: a shimmering placeholder for content that is still loading. Set its height with `size` (`sm` or `md`) or `height`, and its width with `width`.

`Table` can now show placeholder rows while loading instead of a centered spinner: set `loadingVariant="skeleton"` alongside `loading`, and `skeletonRowCount` to choose how many rows (3 by default). The placeholders follow the table `size`.

Visual: unchanged by default. `loadingVariant` defaults to `spinner`, which is what `loading` has always drawn. The table also sets `aria-busy` while loading, in either variant.
