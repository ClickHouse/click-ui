---
'@clickhouse/click-ui': patch
---

Prevent duplicate CSS imports in `vite build --watch` mode by clearing `trackedImports` between rebuilds
