---
'@clickhouse/click-ui': patch
---

Fix nested Container inheriting layout props after the CSS Modules migration. Container forwards `fillHeight`, `grow`, `shrink`, `minHeight`, `maxHeight` and `overflow` as CSS custom properties, which inherit by default, so a child Container would pick up an ancestor's values (e.g. a parent with `fillHeight` stretched every descendant to full height). The base `.container` rule now resets these custom properties so each Container keeps its own defaults.
