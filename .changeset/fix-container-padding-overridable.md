---
'@clickhouse/click-ui': patch
---

Fix two Flyout regressions introduced by #1095:

- **Container base styles overriding equal-specificity styled-components.** Since Container migrated to CSS Modules, its base rule beat any `styled(Container)` override of layout properties like `padding` and `gap` (e.g. a downstream `styled(Flyout.Header)` padding override was silently dropped). The base rule is now scoped with `:where()` so modifier classes and consumer overrides win without a specificity hack, and the temporary `&&` workaround in Flyout has been removed.
- **Unintended 1rem gap on every flyout.** `FlyoutContent` had a malformed declaration (`padding` missing its trailing semicolon) that had been silently dropping both `padding` and `gap` since the component was written. #1095's drive-by semicolon fix activated a `1rem` gap on all flyouts — and because the sidebar is a Flyout, it added extra vertical space to the nav too. The gap (never shipped, and `flyout.space.x` is `0` so the padding was always a no-op) has been removed to restore the prior layout.
