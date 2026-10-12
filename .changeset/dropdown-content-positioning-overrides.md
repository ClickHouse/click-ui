---
"@clickhouse/click-ui": patch
---

`Dropdown.Content` now uses the `sideOffset`, `avoidCollisions` and `collisionPadding` you pass instead of always replacing them with its defaults. The defaults do not change. `responsivePositioning` now only sets the defaults of `avoidCollisions` and `collisionPadding`; a value you pass for either prop takes precedence. If you already pass one of these props, it now has an effect: for example, `avoidCollisions={false}` stops the menu from shifting or flipping at the viewport edge.
