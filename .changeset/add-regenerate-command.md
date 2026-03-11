---
'@clickhouse/click-ui': minor
---

Add `convert:regenerate` command to regenerate asset types (logos, icons, flags, payments) without adding new components. This allows refreshing types.ts and registry files (Light/Dark) when the converter script is updated or when imports need to be standardized.

**How to use?**

Regenerate all asset types:
```
yarn convert:regenerate
```

Regenerate a specific asset type only:
```
yarn convert:regenerate --type=icons
```

Supported values for `--type`: `logos`, `icons`, `flags`, `payments`
