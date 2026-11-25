---
'@clickhouse/click-ui': patch
---

Stop `Button` from looking pressed after a mouse click. The pressed colors stayed until focus moved somewhere else; they now show only while the button is held down. Keyboard focus is unchanged.
