## What Are Polymorphic Components?

Polymorphic components allow you to change the underlying HTML element or React component while preserving full type safety. This means you get autocomplete and type checking for both:
1. The custom component's props (like `gap`, `orientation`, etc.)
2. The native element's props (like `onClick`, `href`, `disabled`, etc.)

## Key Features

✅ **Full Type Safety** - TypeScript knows which props are valid based on the `component` prop
✅ **DRY Implementation** - Reusable utility types in `@/utils/polymorphic`
✅ **Ref Forwarding** - Properly typed refs for any element type
✅ **Native & Custom Components** - Pass any HTML element or React component

## Implementation

### Utility Types

All polymorphic logic is centralized in [`src/utils/polymorphic/index.ts`](index.ts):

```typescript
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
```

### Creating a Polymorphic Component

```typescript
import { ElementType, forwardRef } from "react";
import clsx from "clsx";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./MyComponent.module.scss";

// 1. Define props interface extending PolymorphicComponentProps
export interface MyComponentProps<T extends ElementType = "div">
  extends PolymorphicComponentProps<T> {
  customProp?: string;
  gap?: "sm" | "md" | "lg";
}

// 2. Implement the component with PolymorphicProps and PolymorphicRef
const _MyComponent = <T extends ElementType = "div">(
  { component, customProp, gap, ...props }: PolymorphicProps<T, MyComponentProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "div";

  return (
    <Component
      ref={ref}
      className={clsx(styles.myComponent, {
        [styles.gapSm]: gap === "sm",
        [styles.gapMd]: gap === "md",
        [styles.gapLg]: gap === "lg",
      })}
      {...props}
    />
  );
};

// 3. Export with PolymorphicComponent type
export const MyComponent: PolymorphicComponent<MyComponentProps> = forwardRef(_MyComponent);
```

## Usage Examples

### With Native HTML Elements

```tsx
// As a button - gets all button props
<Container
  component="button"
  onClick={(e) => console.log(e)}
  disabled
  gap="md" // Custom Container prop
/>

// As an anchor - gets all anchor props
<Container
  component="a"
  href="https://example.com"
  target="_blank"
  orientation="vertical" // Custom Container prop
/>

// As a list item
<Text
  component="li"
  size="lg"
  color="muted"
>
  List item text
</Text>
```

### With Custom React Components

```tsx
// Container rendered as Text
<Container
  component={Text}
  size="xl" // Text prop
  color="danger" // Text prop
  gap="lg" // Container prop
>
  This is a Container with Text styling
</Container>

// EllipsisContent rendered as Text
<EllipsisContent
  component={Text}
  size="sm" // Text prop
  weight="bold" // Text prop
>
  This text will be truncated with ellipsis
</EllipsisContent>
```

### With Refs

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
const divRef = useRef<HTMLDivElement>(null);

<Container component="button" ref={buttonRef} gap="md">
  Button Container
</Container>

<Container ref={divRef} gap="md">
  Div Container (default)
</Container>
```

## Available Polymorphic Components

The following components support the `component` prop:

- **`Container`** - Flexible layout container (default: `div`)
- **`GridContainer`** - CSS Grid container (default: `div`)
- **`EllipsisContent`** - Text truncation wrapper (default: `div`)
- **`Text`** - Text component (default: `p`)
- **`Link`** - Link component (default: `a`)

## Type Safety Examples

### ✅ Valid Usage

```tsx
// All these work perfectly with full autocomplete:

<Container component="button" onClick={handler} disabled />
<Container component="a" href="/path" target="_blank" />
<Text component="span" onClick={handler} />
<GridContainer component="section" role="region" />
```

### ❌ Type Errors (Caught at Compile Time)

```tsx
// ERROR: div doesn't have 'disabled'
<Container component="div" disabled />

// ERROR: span doesn't have 'href'
<Text component="span" href="https://example.com" />

// ERROR: Invalid prop value
<Container gap="invalid-value" />
```

## Real-World Example

```tsx
<Container component="main" padding="lg" gap="xl" orientation="vertical">
  <Container component="header" gap="md">
    <Text component="h1" size="xl" weight="bold">
      Page Title
    </Text>
  </Container>

  <Container component="section" gap="md" orientation="vertical">
    <Text component="h2" size="lg" weight="semibold">
      Section Title
    </Text>

    <GridContainer
      component="ul"
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gap="md"
    >
      <Text component="li" size="md">Feature 1</Text>
      <Text component="li" size="md">Feature 2</Text>
      <Text component="li" size="md">Feature 3</Text>
    </GridContainer>
  </Container>

  <Container component="footer" gap="sm">
    <Link component="a" href="/docs" size="sm">
      Documentation
    </Link>
  </Container>
</Container>
```

## Technical Details

### How It Works

1. **`PolymorphicComponentProps<T>`** - Base interface with `component?: T`
2. **`PolymorphicProps<T, TProps>`** - Merges component-specific props with native element props
3. **`PolymorphicRef<T>`** - Extracts the correct ref type for element `T`
4. **`PolymorphicComponent<TProps>`** - Final exported component type with proper inference

### Type Inference Flow

```typescript
<Container component="button" onClick={...} />
         ↓
T = "button" (inferred from component prop)
         ↓
Props = ContainerProps & ComponentProps<"button">
         ↓
Result: You get autocomplete for both Container AND button props!
```

For more examples, see [`src/utils/polymorphic.test.tsx`](src/utils/polymorphic.test.tsx).
