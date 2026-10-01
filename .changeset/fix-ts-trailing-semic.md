---
'@clickhouse/click-ui': patch
---

Remove a stray trailing `;` from 226 string values in the exported `themes` object (typography shorthands and two gradients). The generated CSS variables were already clean and are unchanged.
