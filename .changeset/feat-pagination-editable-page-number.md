---
'@clickhouse/click-ui': minor
---

Make the `Pagination` page number editable. Typing now only changes the field, and `onChange` is called with the typed page on Enter or when the field loses focus. Escape and invalid values restore the current page. Before, `onChange` was called on every keystroke, and the field couldn't be cleared to type a new number.

Visual: unchanged.
