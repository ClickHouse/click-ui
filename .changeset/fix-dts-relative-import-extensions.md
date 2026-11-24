---
'@clickhouse/click-ui': patch
---

Published type declarations now use full relative import paths (`./Button.js`, `./components/Accordion/index.js`), so component, hook and prop types resolve under TypeScript `moduleResolution: "node16"` / `"nodenext"` instead of silently becoming `any`. No change for `"bundler"` resolution.

Visual: unchanged.
