---
'@clickhouse/click-ui': minor
---

Adds keyboard support for resizing the table column, e.g. on the tab column separator "focus", the user can now press keyboard arrows/cursor keys (left or right) for controlling the resizing direction.

The changes were made to let everyone use the resize feature, not just mouse users, e.g. improved accessibility.


## How to use?

On a view that includes a table element, press the TAB key on your keyboard to select the column separator. Once the separator is focused, use the arrow/cursor left and right keys to control the resize direction. Press escape key (ESC) to leave focus.
