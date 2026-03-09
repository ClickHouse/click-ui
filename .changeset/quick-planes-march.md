---
'@clickhouse/click-ui': patch
---

Fix incorrect type export: `ImageName` (which includes icons, logos, flags, and payments) was incorrectly exported only as `IconName`. Now exports both `IconName` and `ImageName` types.

**What changed?**

This fix introduces a potential subtle breaking change. Previously, consumers importing `IconName` were actually getting `ImageName` (i.e., `IconName | LogoName | FlagName | PaymentName`). After this fix, `IconName` becomes the narrower type (icons only). If you were passing logo, flag, or payment names into a variable typed as `IconName`, you may now see TypeScript errors. Update those usages to use `ImageName` instead.
