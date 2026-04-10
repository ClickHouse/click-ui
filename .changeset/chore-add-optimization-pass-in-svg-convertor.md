---
'@clickhouse/click-ui': patch
---

Add an SVG normalization step to fix breaking issues before proceeding with conversion and optimization. The normalization is based in "conservative" optimisation steps, to reduce chances of visual changes.
