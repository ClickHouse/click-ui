---
'@clickhouse/click-ui': patch
---

Expose the options of `Select`, `MultiSelect` and `CheckboxMultiSelect` to screen readers as a listbox. Each option now announces its name, position, and selected and disabled state; the highlighted option is announced as the arrow keys move it; and the decorative check icon and checkbox are no longer read out.

Visual: unchanged.
