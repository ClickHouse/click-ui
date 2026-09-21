---
'@clickhouse/click-ui': patch
---

Fix `InitCUIThemeScript` breaking when `storageKey`, `defaultTheme` or `attribute` contain a quote or `<`. Values are now encoded into the inline script and cannot break out of it. The script text changed: if you allow-list it with a CSP hash, recompute the hash or use the `nonce` prop.
