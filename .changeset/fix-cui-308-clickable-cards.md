---
'@clickhouse/click-ui': patch
---

`CardPrimary` and `CardSecondary` with `onClick` are exposed as buttons and activate with Enter and Space, unless the card renders its own `infoText` button (`CardPrimary`) or `infoUrl` link (`CardSecondary`); then the card gets no button role and that control keeps Enter and Space. Display-only cards keep the default key behavior. A disabled `CardPrimary`, `CardSecondary` or `CardHorizontal` no longer calls `onClick`. Do not put links or buttons inside the title, description or children of a clickable card.
