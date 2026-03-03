---
'@clickhouse/click-ui': minor
---

Enforce generic type annotation style for arrays via ESLint

- Added `@typescript-eslint/array-type` ESLint rule with `'generic'` option to enforce `Array<Type>` notation over `Type[]`
- Auto-fixed all 36 existing array type violations across the codebase
