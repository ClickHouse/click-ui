---
'@clickhouse/click-ui': patch
---

`Checkbox`, `Switch` and `RadioGroup` inside a `<form>` now also fire a bubbled `change` event when the checked value updates after the click, for example from an async handler. A `Tooltip` inside a modal `Popover` keeps the right tab order. `ContextMenu.Content` now applies a `sideOffset` you pass.
