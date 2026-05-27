---
'@clickhouse/click-ui': patch
---

Fix Button loading state regression introduced by the CSS Modules migration. Restore the dual shimmer animation (fixed-width vs fill-width) and stop the disabled styles from overriding the per-type background while loading, so a loading danger button is light red again instead of gray.
