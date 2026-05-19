---
'@clickhouse/click-ui': patch
---

🔄 **SplitButton Component Migration to CSS Modules**

The `SplitButton` component has been migrated from Styled Components to CSS Modules (Web Standards + BEM class name convention).

**Changes:**
- Migrated from `styled-components` to CSS Modules (`SplitButton.module.css`)
- Using BEM naming convention (`.split-button`, `.primary-button`, `.secondary-button`, etc.)
- Maintained full API compatibility - no breaking changes
- Both `primary` and `secondary` variants preserved
- Interactive states (hover, focus, disabled) maintained with CSS pseudo-classes

**Visual Testing:**
This migration is protected by visual regression tests covering all button types and states in both light and dark themes.
