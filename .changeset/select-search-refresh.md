---
"@clickhouse/click-ui": patch
---

Select/MultiSelect/CheckboxMultiSelect now snapshot each item's searchable text from the DOM when a search begins, instead of capturing it up front. Search therefore matches text an item changed after the menu opened (e.g. a row that renders from its own state), and the internal capture no longer needs to re-key on the option set.
