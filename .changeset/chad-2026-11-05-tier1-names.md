---
'@clickhouse/click-ui': minor
---

`Checkbox`, `Switch` and `RadioGroup.Item` now take their accessible name from the visible label, so a JSX label is read correctly. They no longer copy `label` into `aria-label`. `RadioGroup` is now named by its `label`.

`aria-label` and `aria-labelledby` on `Select` now name the trigger button. On `RadioGroup.Item`, `aria-label`, `aria-labelledby` and `aria-describedby` now reach the radio.

The `Select` search input and its clear button, the `Table` row and select-all checkboxes, and the `CheckboxMultiSelect` item checkboxes now have names. The icons in `Link` and in the `Select` trigger are hidden from screen readers. The `TextField` loading icon is named "Loading".

Visual: unchanged.

When you upgrade:

- A `Checkbox`, `Switch` or `RadioGroup.Item` without a label now has no name, where it had "undefined". Give it an `aria-label`.
- A `Link` with an icon and no text now has no name. Give it an `aria-label`.
- A test that finds a `Select` trigger by a name ending in "sort", or a `Link` by a name ending in its icon name, must use the shorter name.
