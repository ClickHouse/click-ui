---
'@clickhouse/click-ui': minor
---

Add multiple selection support to ButtonGroup component with controlled and uncontrolled modes.

**What changed?**

- Added `multiple` prop to enable multi-selection mode
- `onClick` callback returns `string` in single mode (backward compatible) and `Set<string>` in multiple mode
- Exported `SelectionValue` type for consumers

**How to use?**

Single selection (default) - backward compatible:

```tsx
<ButtonGroup
  options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]}
  defaultSelected="a"
  onClick={(value, selected) => console.log(selected)}
/>
```

Multiple selection which state is provided internally by component

```tsx
<ButtonGroup
  multiple
  options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]}
  defaultSelected={new Set(['a'])}
  onClick={(value, selected) => console.log([...selected])}
/>
```
  
Multiple selection which state's controlled by consumer app

```tsx
const [selected, setSelected] = useState<Set<string>>(new Set(['a']));
<ButtonGroup
  multiple
  options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]}
  selected={selected}
  onClick={(_, newSelection) => setSelected(newSelection as Set<string>)}
/>
```
