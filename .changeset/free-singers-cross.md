---
'@clickhouse/click-ui': patch
---

Help correct bad merge conflict decisions/resolutions caused by squash-merging chained branches and loss of base context. Public API changes from PR #845 had leaked into PR #841, resulting in incorrect decisions when merging main back to the target branch.
