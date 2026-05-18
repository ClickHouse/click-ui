---
'@clickhouse/click-ui': patch
---

Add validation to prevent CSS file name collisions at build time.

**Why this matters:**

When a component uses CSS Modules (e.g., `Button.module.css`), the build process generates a processed CSS file (e.g., `.css-modules-temp/components/Button.css`). If a regular CSS file with the same name exists in the source (e.g., `src/components/Button.css`), both would attempt to write to `dist/components/Button.css`, causing ambiguity about which file should take precedence.

**What changed:**

Added early validation (`preventCssNameOverwrites`) that throws a clear error if such a naming conflict is detected, rather than silently overwriting files. The check runs once before the build since it validates source file names, which are format-independent.
