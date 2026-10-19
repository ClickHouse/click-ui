---
'@clickhouse/click-ui': patch
---

`CardPrimary` and `CardSecondary` with `onClick` are exposed as buttons and activate with Enter and Space, unless the card renders its own `infoText` button (`CardPrimary`) or `infoUrl` link (`CardSecondary`); then that control stays the only one. Display-only cards keep the default key behavior. A disabled card no longer calls `onClick`, on any card. Do not put links or buttons inside the title, description or children of a clickable card.
