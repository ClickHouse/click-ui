---
"@clickhouse/click-ui": patch
---

CodeBlock action buttons (copy, wrap) are now hidden by default and revealed on hover or focus-within with a fade transition. Buttons display a semi-opaque background pill matching the code block theme to prevent overlap with code content, and expose descriptive `aria-label`s (with `aria-pressed` on the wrap toggle) for screen reader users. IconButton now honours a caller-supplied `aria-label`, falling back to the icon name when none is provided.
