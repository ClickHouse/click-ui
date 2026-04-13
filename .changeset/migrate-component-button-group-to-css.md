---
'@clickhouse/click-ui': patch
---

Migrate ButtonGroup component from Styled-Components to CSS Modules

**Behavior Improvements:**
- **Accessibility**: Added `aria-disabled` attribute to disabled buttons (complements native `disabled` prop)
- **Accessibility**: Made `aria-label` required for WCAG 4.1.2 compliance (role="group" requires accessible name)
- **Accessibility**: Added `:focus-visible` styles for keyboard navigation with visible focus ring
- **Forms**: Added `type="button"` to prevent accidental form submissions when used inside forms
- **States**: Added proper `:hover:not(:disabled)` selector to prevent hover styles on disabled buttons
- **States**: Added explicit styling for disabled+active button combination

**Breaking Changes:** None - all changes are additive improvements that maintain backward compatibility
