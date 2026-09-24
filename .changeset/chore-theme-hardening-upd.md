---
'@clickhouse/click-ui': patch
---

Fixed `InitCUIThemeScript` breaking when `storageKey`, `defaultTheme` or `attribute` contain a quote or `<`. Values are now encoded into the inline script and cannot break out of it.
