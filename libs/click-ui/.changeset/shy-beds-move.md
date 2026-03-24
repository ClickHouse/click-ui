---
"@clickhouse/click-ui": minor
---

Filenames can be long, which causes issues as found in the reported issue [693](https://github.com/ClickHouse/click-ui/issues/693).

Since upload file error status messages add extra length, it's found best to move it. Here, we move the failure message after the file details container.
