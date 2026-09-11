---
'@clickhouse/click-ui': patch
---

Fixed the horizontal-circle loader animations, which used the invalid keyframe selector `0` instead of `0%`, causing the initial keyframe to be dropped by browsers that don't tolerate the unitless selector.
