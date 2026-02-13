---
'@clickhouse/click-ui': minor
---

Prevent dayjs mismatch version blocking package dependency install.
On CI run, there's a step which installs with flag "immutable". Because there's a dayjs mismatch version, the install process errors.
