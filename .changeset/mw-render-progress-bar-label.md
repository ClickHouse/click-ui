---
'@clickhouse/click-ui': patch
---

Render the `label` prop on the default `ProgressBar`. The prop was already part of the public API but was ignored, so the bar always showed the percentage. It now shows the label when one is passed, and still prefers `successMessage` once progress reaches 100%.
