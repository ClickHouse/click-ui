---
'@clickhouse/click-ui': minor
---

Adds `startContent` and `endContent` props to `NumberField`, matching the existing `TextField` API. This enables rendering additional elements (e.g., unit labels, currency symbols) inside the input field without absolute-positioning hacks.

## What has changed?

- New `startContent` prop for rendering content to the left of the input
- New `endContent` prop for rendering content to the right of the input
- Clicking on `startContent` focuses the input field
- `endContent` is displayed alongside the existing loading indicator when both are present
- Added `WithEndContent` and `WithStartContent` stories

## How to use?

With a currency symbol prefix:

```tsx
import { NumberField, Text } from '@clickhouse/click-ui';

<NumberField
  label="Price"
  placeholder="0.00"
  hideControls
  startContent={
    <Text color="muted" size="sm">
      $
    </Text>
  }
/>
```

With a unit suffix:

```tsx
import { NumberField, Text } from '@clickhouse/click-ui';

<NumberField
  label="Spend limit"
  placeholder="0"
  hideControls
  endContent={
    <Text color="muted" size="sm">
      dollars / credits
    </Text>
  }
/>
```
