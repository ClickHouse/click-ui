---
'@clickhouse/click-ui': patch
---

Fix doubled spacing around Flyout section separators. The `FlyoutContent` container gap stacked on top of the separators' own margins, adding extra padding between the header, body, and footer. Section spacing now matches the design.
