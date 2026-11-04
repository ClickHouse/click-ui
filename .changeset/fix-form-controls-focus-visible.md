---
'@clickhouse/click-ui': patch
---

Show a visible focus ring on `Checkbox`, `Switch` and `RadioGroup` items when they're focused with the keyboard. They had none, because `FormRoot` removes the outline from everything inside it. They now use the same ring as `Button` and `IconButton`.
