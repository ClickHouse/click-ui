---
'@clickhouse/click-ui': patch
---

`DropdownItemProps` exported from `@clickhouse/click-ui` and `@clickhouse/click-ui/Dropdown` now matches what `Dropdown.Item` actually accepts. The barrel was re-exporting a copy in `Dropdown.types.ts` that the component never imported, so it was missing both `type` and `tooltipProps` and typing a wrapper around `Dropdown.Item` failed to compile. `Dropdown.types.ts` is now the single declaration, as in `ContextMenu`, and `DropdownItemProps` is exported from the package root for the first time.
