---
"@clickhouse/click-ui": patch
---

Hides Tooltip when cursor levaes the trigger in ElipsisContent.

Default Tooltip behavior can obscure interaction with neighbouring elements by remaining on screen when you move your cursor from the trigger to the tooltip.
For EllipsisContent, it should always hide in these situations. Its purpose is to reveal the full content, never to be interacted with.
If you need to interact with tooltip content, you need another component.
