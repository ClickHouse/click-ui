---
'@clickhouse/click-ui': patch
---

Removes the ESLint/TSLint rule that enforced arrays to be typed using generic syntax (Array<T>) instead of the shorthand array syntax (T[]).

The generic array annotation style (Array<T>) adds verbosity without meaningful benefit. Removing this lint rule allows developers to use idiomatic TypeScript, such as the more concise T[] shorthand, which reduces friction and improves readability, e.g., TypeScript docs, LSP will show T[] and not Array<T>.
