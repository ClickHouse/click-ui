---
'@clickhouse/click-ui': minor
---

Response for reported issue in [#785](https://github.com/ClickHouse/click-ui/issues/785), which reports a missing prop forwarding option for component customisation on the consumer application side. For example, it doesn't expose className or other props that forward to the common InternalSelect -> StyledSelectTrigger. Thus, we provide the requested changes to allow component customisation!

## How to use?

Declare a triggerProps with desired elements, for example:

```tsx
<Select
  {...props}
  triggerProps={{
      className: 'custom-trigger',
      style: {
        border: '2px dashed #00f',
        borderRadius: '8px',
        maxWidth: '200px',
      },
      onFocus: () => console.log('🤖 Trigger focused!'),
      onMouseEnter: () => console.log('👀 Mouse entered trigger!'),
  }}
>
```
