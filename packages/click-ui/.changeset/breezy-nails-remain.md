---
"@clickhouse/click-ui": minor
---

Truncate filenames by shortening the middle revealing critical parts.

Assume you have:

```
console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-001.csv
console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-005.csv
dashboard.mongodb.atlas_Export.12-15-2024.customer-data-analysis-report-final-v2.json
admin.postgresql.heroku_Backup.03-22-2023.transaction-logs-monthly-summary-march.sql
```

In the current faulty version you'd get something like:

```
console.clickhouse.cloud_Archive.01-~.csv
console.clickhouse.cloud_Archive.01-~.csv
dashboard.mongodb.atlas_Export.12-1~.csv
admin.postgresql.heroku_Backup.03-2~.csv
```

Notice that the first two filenames, when presented truncated, have the same shortened name, making it hard to differentiate.

In the PR proposed version you'd find easier to identify files if these are named in a maintainable way:

```
console.clickh...filename-001.csv
console.clickh...filename-005.csv
dashboard.mong...ort-final-v2.json
admin.postgres...ummary-march.sql
```

Notice that the first and last digits help identify the file more concisely, allowing for a shorter length.
