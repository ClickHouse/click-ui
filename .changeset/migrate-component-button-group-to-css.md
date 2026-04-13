---
'@clickhouse/click-ui': minor
---

Migrate ButtonGroup component from Styled-Components to CSS Modules

**New Features:**
- **Accessibility**: Added `aria-disabled` attribute to disabled buttons (complements native `disabled` prop)
- **Accessibility**: Added optional `aria-label` prop for WCAG 4.1.2 compliance (role="group" should have accessible name)
- **Accessibility**: Added `:focus-visible` styles for keyboard navigation with visible focus ring
- **Forms**: Added `type="button"` to prevent accidental form submissions when used inside forms
- **States**: Added proper `:hover:not(:disabled)` selector to prevent hover styles on disabled buttons
- **States**: Added explicit styling for disabled+active button combination

**Migration Notes:**
Consumers are encouraged to add `aria-label` to their ButtonGroup instances for improved accessibility, though it remains optional for backward compatibility.
