---
"@clickhouse/click-ui": patch
---

Fix CardHorizontal double onClick handler bug where clicking the inner Button would invoke onButtonClick and window.open(infoUrl) twice due to event bubbling. Added e.stopPropagation() to the button's click handler.
