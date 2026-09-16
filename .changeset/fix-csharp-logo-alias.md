---
"@clickhouse/click-ui": patch
---

`<Icon name="c#" />` now renders the C# logo. It failed twice over before: `Icon`
did not resolve asset aliases at all, and the alias itself pointed at `c-sharp`
while the asset registers as `csharp`. Both are fixed.
