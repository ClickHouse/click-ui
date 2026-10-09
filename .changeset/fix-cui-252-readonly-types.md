---
'@clickhouse/click-ui': minor
---

**Breaking:** Array props now accept readonly arrays and `as const` data. Code that mutates an array typed with a click-ui prop type, such as `ButtonGroupProps['options']`, no longer compiles.

Sortable `MultiSelect` no longer reorders the `value` array you pass in.

Visual: unchanged.

Migration: `const options: ButtonGroupProps['options'] = []` becomes `const options: ButtonGroupProps['options'][number][] = []`.
