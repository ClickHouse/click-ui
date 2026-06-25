---
'@clickhouse/click-ui': patch
---

Fix Container base styles overriding equal-specificity styled-components. Since Container migrated to CSS Modules, its base rule beat any `styled(Container)` override of layout properties like `padding` and `gap` (e.g. a downstream `styled(Flyout.Header)` padding override was silently dropped). The base rule is now scoped with `:where()` so modifier classes and consumer overrides win without a specificity hack, and the temporary `&&` workaround in Flyout has been removed.
