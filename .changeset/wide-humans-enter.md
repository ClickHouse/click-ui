---
'@clickhouse/click-ui': minor
---

It aims to reduce redundancy found in component import statements, e.g. "@/components/Badge/Badge" requires "Badge" twice.

We can omit the second one by leveraging the default resolution, e.g., index, since the directory name is the component name.

Consequently, we shorten long paths into an elegant and concise import statement.


## Migration guide

Replace redundant import statements, such as "@/components/Badge/Badge" by preferring the simpler import statement "@/components/Badge".
