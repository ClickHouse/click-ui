---
'@clickhouse/click-ui': minor
---

The `IconButton` component has been migrated from Styled Components to CSS Modules (Web Standards + BEM class name convention). This change is part of our ongoing effort to modernize the component library.

**Changes (non-breaking):**
- Migrated from `styled-components` to CSS Modules (`IconButton.module.css`)
- Using BEM naming convention (`.icon-button`, `.icon-button_primary`, `.icon-button_sm`, etc.)
- Maintained full API compatibility - no breaking changes
- All variants (primary, secondary, ghost, danger, info) and sizes (default, sm, xs) preserved
- Interactive states (hover, focus, active) maintained with CSS pseudo-classes
