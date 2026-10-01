---
"@clickhouse/click-ui": patch
---

`CardHorizontal` and `CardPrimary` now open `infoUrl` in a new tab with `noopener`, so the opened page can no longer reach back into the app through `window.opener`. Non-http(s) values such as `javascript:` or `data:` URLs are ignored with a console warning. Absolute and relative http(s) URLs keep working as before.
