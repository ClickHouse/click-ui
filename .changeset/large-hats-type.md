---
"@clickhouse/click-ui": minor
---

Adapts file upload filename truncation responsiveness, e.g. shows truncated file name on smaller container sizes, showing the original otherwise. It shows the complete filename on element hover.

This is a variation of [779](https://github.com/ClickHouse/click-ui/pull/781), which shortens the middle of the text responsively but over breakpoints. Ideally, it should be fluid, but that'd require computation/listener/observables, through container size, it might be hard to justify the time.

As an alternative, we introduce text number of characters responsive fluidity by faking it, e.g. does not introduce listeners/observables, uses native css resulting in a fluid, well-performing responsive truncation.
