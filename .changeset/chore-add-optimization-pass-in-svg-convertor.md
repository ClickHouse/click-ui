---
'@clickhouse/click-ui': patch
---

Add an SVG normalization step to fix breaking issues before proceeding with conversion and optimization. The normalization is based in "conservative" optimisation steps, to reduce chances of visual changes.

**Before:**
```
SVG File → SVGR (SVGO) → React Component
```

**After:**
```
SVG File → SVGO Normalize → Create temp file → SVGR (no SVGO) → React Component → Delete temp file
```
