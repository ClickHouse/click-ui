---
'@clickhouse/click-ui': patch
---

Fix Label, Text, Title, and Icon base styles overriding equal-specificity styled-components. Since these components migrated to CSS Modules, each base rule beat any `styled(Component)` override of a property the base also declared — so a consumer's override could be silently dropped depending on bundle order (e.g. InputWrapper's `labelColor`, FileUpload's title/description font and color, and FileUpload's icon sizing). The base rules are now scoped with `:where()` so modifier classes and consumer overrides win by specificity instead of relying on source order, matching the earlier Container fix. Rendering of each component in isolation is unchanged — modifier classes still win over the base.
