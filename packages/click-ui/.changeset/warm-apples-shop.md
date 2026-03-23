---
'@clickhouse/click-ui': minor
---

Reconciles SVG asset management for Flags, Icons, and Logos by restructuring file locations for React SVG components to match the conventions established in the original SVG-to-React conversion [#828](https://github.com/ClickHouse/click-ui/pull/828).

It also modifies the original SVG to React Component process to support all three asset types: Flags, Icons and Logos. Included some safeguards, to try to help enforce naming conventions to facilitate. This bit might require further attempts, as it relies on the same retroactive~mapping to old names encountered or established in the Logo conversation version.

For now, this second iterative pass creates a consistent asset management flow across all three asset types.
