---
'@clickhouse/click-ui': minor
---

Add `allowOnlyDatesList` prop to `DateRangePicker` to restrict selectable dates to an allow-list. Dates not in the list are greyed out and disabled, mirroring the existing `DatePicker` behavior. When omitted or empty, selection is unrestricted, and the prop composes with `futureDatesDisabled` and `maxRangeLength`.
