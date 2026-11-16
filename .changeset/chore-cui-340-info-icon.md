---
'@clickhouse/click-ui': minor
---

**Breaking:** there is now one info icon, `info`. `info-in-circle` is renamed to `info`, and `information` (the plain "i") is removed.

Visual: anything that used `information` now shows the circled "i". Anything that used `info-in-circle` looks the same.

Migration: `name="info-in-circle"` and `name="information"` become `name="info"`. The old names still render `info` and log a deprecation warning, but they are no longer in the `IconName` union, so typed props (`Icon.name`, `Button.iconLeft`, `Alert.customIcon`, …) fail typecheck until you rename them. `FileTabs` `icon` also accepts a node, so a string there still compiles: search for the old names. The icon's `aria-label` is now `info`, so update test queries that use the old names.
