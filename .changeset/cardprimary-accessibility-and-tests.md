---
"@clickhouse/click-ui": minor
---

Add visual regression tests, and improve CardPrimary accessibility

**Accessibility Improvements:**

- Fixed ARIA violation by removing `role="button"` from card wrapper when no action exists
- Removed `aria-pressed` from non-interactive card wrapper
- Corrected `tabIndex` behavior: cards with inner buttons now properly receive focus only on the button element, preventing double tab stops
- Simplified keyboard navigation by removing unnecessary handlers from non-clickable wrapper

**Test Coverage:**

- Added comprehensive Playwright visual regression tests for CardPrimary component
- Coverage includes: size variants, alignment variants, state variants (disabled, selected, shadow)
- Content variants: with/without icon, with icon URL, title only, description only
- Top badge variants and small size combinations
- Interactive states: hover and focus snapshots
- Light and dark theme coverage
- Events and accessibility tests for aria-disabled and keyboard navigation

**Breaking Changes:** None - visual appearance unchanged, only accessibility semantics improved.
