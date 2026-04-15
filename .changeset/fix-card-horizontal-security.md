---
"@clickhouse/click-ui": patch
---

Security fix for CardHorizontal by validating URLs before opening. Also, adds `noopener/noreferrer`. To help prevents javascript URI and tab related attacks.
