---
'@clickhouse/click-ui': minor
---

**Breaking:** accessible names change for `Checkbox`, `Switch` and the checkboxes inside `Table` and `CheckboxMultiSelect`. Nothing changes visually.

- `Checkbox` and `Switch` take their name from the visible `label`, so a JSX label is read correctly. They no longer copy `label` into `aria-label`.
- The `Checkbox` check icon is hidden from screen readers.
- New names: the `Table` row and select-all checkboxes ("Select row", "Select all rows"), and `CheckboxMultiSelect` item checkboxes (named by the option label; the option `description` becomes their description).

**Migration:**

- A `Checkbox` or `Switch` without a label was named "undefined" and now has no name. Give it a visible `label`, or `aria-labelledby` that points at visible text. Use `aria-label` only when the purpose is already visible from context, for example a checkbox in a table row. Before: `<Switch checked={on} />`. After: `<Switch checked={on} label="Dark mode" />`.
- Tests that select a `Checkbox` or `Switch` by its `aria-label` attribute need a role and name query, for example `getByRole('checkbox', { name: 'Accept terms' })`.
