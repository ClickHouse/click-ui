---
'@clickhouse/click-ui': minor
---

Add `convert:regenerate` command to regenerate all asset types (logos, icons, flags, payments) without adding new components. This allows refreshing types.ts and registry files (Light/Dark) when the converter script is updated or when imports need to be standardized.

**How to use?**

```
yarn convert:regenerate
```
