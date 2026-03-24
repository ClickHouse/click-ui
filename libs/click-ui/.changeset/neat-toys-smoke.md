---
'@clickhouse/click-ui': minor
---

Allow users ability to choose whether text within cells wraps or truncates when space is limited, e.g. text wrap, truncated at the end, or middle.

The consumer can now control the overflow mode preference at table/column level by declaring the preferred overflow mode when defining the table header items (columns), e.g. declare "overflowMode" to "truncated-middle" along label "filename".
