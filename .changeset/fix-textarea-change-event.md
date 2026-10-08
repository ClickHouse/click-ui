---
'@clickhouse/click-ui': patch
---

Fix TextAreaField not calling onChange when an onInput prop is passed, including onInput={undefined}.
