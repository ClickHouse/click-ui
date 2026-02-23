---
'@clickhouse/click-ui': patch
---

Removes nonsense types which are utterly complex and not readable and shows inconsistency in Figma theme provided data structures.

The src/theme/index.ts has a few utility types that seem unnecessarily complex, e.g. they are not human-readable, cause confusion and are meaningless in the context of providing utility or any sort of added value. Here, we introduce changes that make it much more idiomatic, minimal or simpler.

Consequently, found an issue which is being reported internally, as after simplifying it, it's found that there's an   inconsistency between light and dark theme data structures; Bear in mind that the data structures MUST be equal (not discussing the values but structure wise). While this has to be solved in the origin or source, e.g. Figma, the changes in the Figma theme provided data structures to expose them.

Note that it's solely to facilitate communication and help pinpoint where the problem is located: it does NOT mean or suggest this has to be done manually or that it's ok to change these two files directly in the source code. These MUST be resolved in the source Figma file.
