---
"@clickhouse/click-ui": patch
---

Security fix for CardHorizontal: validate URLs before opening and add noopener/noreferrer. Prevents javascript: URI attacks and tab-nabbing vulnerabilities.
