---
'@clickhouse/click-ui': minor
---

`Alert` neutral and info states now show the `info-in-circle` icon instead of `information`, and the icon follows the alert `size`.

Visual: neutral and info alerts show a circled "i". Medium alerts draw the state icon, including `customIcon`, at 20px instead of 16px. Small alerts keep 16px icons. To keep the previous glyph, pass `customIcon="information"`.
