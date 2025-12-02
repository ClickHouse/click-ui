/**
 * Type safety tests for polymorphic components with SCSS
 * These examples demonstrate that the polymorphic component pattern
 * works correctly with SCSS modules and provides full type safety
 */

import { Container, Text, Link, GridContainer, EllipsisContent } from "@/components";

// ============================================================================
// Test 1: Native HTML Elements
// ============================================================================

export const NativeElementTest = () => (
  <>
    {/* Container as button - gets button props */}
    <Container
      component="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        console.log(e.currentTarget.value)
      } // ✅ button events work
      disabled // ✅ button attributes work
      gap="md" // ✅ Container props work
    />

    {/* Container as a link */}
    <Container
      component="a"
      href="https://example.com" // ✅ anchor attributes work
      target="_blank" // ✅ anchor attributes work
      orientation="vertical" // ✅ Container props work
    />

    {/* Text as span */}
    <Text
      component="span"
      size="lg" // ✅ Text props work
      color="muted" // ✅ Text props work
      onClick={(e: React.MouseEvent<HTMLSpanElement>) => console.log(e)} // ✅ span events work
    >
      Text content
    </Text>
  </>
);

// ============================================================================
// Test 2: Custom React Components
// ============================================================================

export const CustomComponentTest = () => (
  <>
    {/* Container can render another custom component */}
    <Container
      component={Text}
      size="xl" // ✅ Text props are available
      color="danger" // ✅ Text props are available
      gap="lg" // ✅ Container props work
    >
      This is a Container rendered as Text
    </Container>

    {/* EllipsisContent rendered as Text */}
    <EllipsisContent
      component={Text}
      size="sm" // ✅ Text props work
      weight="bold" // ✅ Text props work
      color="muted" // ✅ Text props work
    >
      This text will be truncated
    </EllipsisContent>

    {/* GridContainer as section */}
    <GridContainer
      component="section"
      gridTemplateColumns="repeat(3, 1fr)" // ✅ Grid props work
      gap="md" // ✅ Grid props work
      role="region" // ✅ section attributes work
      aria-label="Grid section" // ✅ section attributes work
    />

    {/* Link as button */}
    <Link
      component="button"
      onClick={e => console.log(e)} // ✅ button events work
      disabled // ✅ button attributes work
      size="lg" // ✅ Link props work
      weight="semibold" // ✅ Link props work
    >
      Button Link
    </Link>
  </>
);

// ============================================================================
// Test 3: Type Errors (These should NOT compile if uncommented)
// ============================================================================

// Example type errors that would be caught:
// 1. div doesn't have 'disabled'
// 2. span doesn't have 'href'
// 3. Invalid Container prop values
// 4. Invalid Text color values

// ============================================================================
// Test 4: Ref Forwarding
// ============================================================================

import { useRef } from "react";

export const RefTest = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ✅ Ref type matches component type */}
      <Container
        component="button"
        ref={buttonRef}
        gap="md"
      >
        Button Container
      </Container>

      {/* ✅ Default ref type (div) */}
      <Container
        ref={divRef}
        gap="md"
      >
        Div Container
      </Container>
    </>
  );
};

// ============================================================================
// Test 5: Real-World Usage Examples
// ============================================================================

export const RealWorldExample = () => (
  <Container
    component="main"
    padding="lg"
    gap="xl"
    orientation="vertical"
  >
    <Container
      component="header"
      gap="md"
    >
      <Text
        component="h1"
        size="xl"
        weight="bold"
      >
        Polymorphic Components with SCSS
      </Text>
    </Container>

    <Container
      component="section"
      gap="md"
      orientation="vertical"
    >
      <Text
        component="h2"
        size="lg"
        weight="semibold"
      >
        Features
      </Text>

      <GridContainer
        component="ul"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap="md"
      >
        <Text
          component="li"
          size="md"
        >
          ✅ Full type safety
        </Text>
        <Text
          component="li"
          size="md"
        >
          ✅ SCSS modules support
        </Text>
        <Text
          component="li"
          size="md"
        >
          ✅ Native HTML props
        </Text>
        <Text
          component="li"
          size="md"
        >
          ✅ Custom component props
        </Text>
      </GridContainer>
    </Container>

    <Container
      component="footer"
      gap="sm"
    >
      <Link
        component="a"
        href="https://example.com"
        size="sm"
      >
        Learn more
      </Link>
    </Container>
  </Container>
);
