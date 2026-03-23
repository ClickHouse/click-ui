---
'@clickhouse/click-ui': patch
---

Fix SVG converter script to generate proper Props interfaces (LogoProps, IconProps, FlagProps, PaymentProps) in asset type files. Previously, the `propsTypeName` configuration was missing, causing Props interfaces to be absent from generated types.
