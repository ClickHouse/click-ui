---
"@clickhouse/click-ui": patch
---

`Dropdown.Item` now forwards its `ref` to the menu item element, or to the child element with `asChild`, so it can be the child of `Tooltip.Trigger asChild` and other components that need a ref.
