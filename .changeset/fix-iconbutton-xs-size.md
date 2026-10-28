---
'@clickhouse/click-ui': patch
---

IconButton size xs now renders at 16x16 as designed. The 1px stroke is taken out of the icon instead of being added around it, so the visible border is kept for every type. Visual change: the xs glyph is 14px instead of 16px.
