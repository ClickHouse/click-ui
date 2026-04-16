---
"@clickhouse/click-ui": patch
---

Migrate CardHorizontal component from styled-components to CSS Modules

- Replace styled-components with CSS Modules using BEM naming convention
- Add CVA (class-variance-authority) for variant management
- Implement forwardRef for ref forwarding
- Improve accessibility with proper keyboard navigation (Space and Enter keys)
- Add comprehensive JSDoc documentation for props
- Fix visual bugs with disabled and selected states
