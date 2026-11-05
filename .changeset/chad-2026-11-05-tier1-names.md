---
'@clickhouse/click-ui': minor
---

**Breaking:** accessible names change for some form controls. Nothing changes visually.

- `Checkbox`, `Switch` and `RadioGroup.Item` take their name from the visible `label`, so a JSX label is read correctly. They no longer copy `label` into `aria-label`. `RadioGroup` is named by its `label`.
- `aria-label` and `aria-labelledby` on `Select`, `MultiSelect` and `CheckboxMultiSelect` name the trigger button. They no longer land on the wrapper or the "No options" element. On `RadioGroup.Item`, `aria-label`, `aria-labelledby` and `aria-describedby` reach the radio.
- New names: the `Select` search input ("Search options"), the `Table` row and select-all checkboxes ("Select row", "Select all rows"), and `CheckboxMultiSelect` item checkboxes (the option label; the option description becomes their description).
- Renamed: the `Select` search clear button ("cross" to "Clear search") and the `TextField` loading icon ("loading-animated" to "Loading").
- Hidden from screen readers: the `Checkbox` check icon, the `Select` trigger icon, the option check icon, and the `Link` icon when the link has text.

**Migration:**

- A `Checkbox`, `Switch` or `RadioGroup.Item` without a label was named "undefined" and now has no name. Add `aria-label`. Before: `<Switch checked={on} />`. After: `<Switch checked={on} aria-label="Dark mode" />`.
- With `aria-label` on a `Select`, the trigger name is that label, without the selected value.
- Tests that find a `Select` trigger by a name ending in "sort", a `Link` by a name ending in its icon name, the clear button by "cross" or the loading icon by "loading-animated" need the new names. `getByLabelText` with a `Select` `aria-label` now returns the trigger button.
