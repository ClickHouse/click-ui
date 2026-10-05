---
"@clickhouse/click-ui": patch
---

`Tooltip.Trigger` now forwards its `ref`, and with `asChild` it passes its props (event handlers, `aria-*`, `data-*`, `className`, …) on to the child instead of dropping them. You can now compose `Tooltip.Trigger asChild` inside another `asChild` part, such as `Dropdown.Item asChild`.
