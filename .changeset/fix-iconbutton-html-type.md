---
'@clickhouse/click-ui': patch
---

Fix buttons unintentionally submitting their enclosing `<form>`. A native `<button>` without an explicit `type` defaults to `type="submit"`, so several components triggered form submission when used inside a form.

New `htmlType` escape hatch (for general-purpose action buttons whose visual `type` prop shadows the native attribute):

- `IconButton` now accepts an `htmlType` prop to set the native button `type` (mirrors `Button`).
- `SplitButton` now accepts an `htmlType` prop to set the native `type` on its primary action button.

Internal buttons that are never meant to submit now default to `type="button"` (non-breaking; consumers can still override):

- `ButtonGroup` options
- `Alert` dismiss buttons
- `InputWrapper` icon button
- `Select` search clear button
- `DatePicker` calendar title button
- `FileTabs` close button
- `CardPromotion` dismiss button
- `Table` row edit/delete buttons
- `VerticalStepper` step trigger
- `CrossButton`
