---
"@clickhouse/click-ui": patch
---

Fix missing focus tokens in theme configuration

Added missing `focus` tokens to the design token source files to prevent them from being removed during token generation:

- Added `card.promotion.color.stroke.focus` with semantic reference `{click.global.color.accent.default}` (resolves to `#151515` in light theme and `#faff69` in dark theme)
- Added `genericMenu.item.color.default.stroke.focus` with value `#437eef` (light theme) and `#faff69` (dark theme)
- Added `genericMenu.item.color.danger.stroke.focus` with value `#437eef` (light theme) and `#faff69` (dark theme)

These tokens are required by the GenericMenu and CardPromotion components for keyboard focus outlines and were previously being lost when regenerating the theme tokens.
