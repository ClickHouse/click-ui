---
'@clickhouse/click-ui': minor
---

Declares the test runner target dirname as src. At the time of writing, the test runner looks for files in any directory, e.g., if you'd add a directory named .ignoreMe, it'd effectively look for test files in this location. For this reason, updated the include and exclude of test property in vite config specifying explicit pathnames.
