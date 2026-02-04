---
'@clickhouse/click-ui': minor
---

Allow the user to resize table columns. Originally, preferred to solve using native CSS but due to limitations, introduced a set of DOM event listeners for computed drag events on mouse move and values. From now on, the user can set the Table to have resizable columns by setting the property `resizableColumns`.
