---
"@clickhouse/click-ui": patch
---

`Dropdown.Content` now uses the `sideOffset`, `avoidCollisions` and `collisionPadding` you pass instead of always replacing them with its defaults. The defaults do not change. When you pass `avoidCollisions` or `collisionPadding`, it takes precedence over `responsivePositioning`.
