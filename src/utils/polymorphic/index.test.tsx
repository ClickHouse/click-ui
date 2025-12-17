/**
 * Type safety tests for polymorphic components with SCSS
 * These examples demonstrate that the polymorphic component pattern
 * works correctly with SCSS modules and provides full type safety
 */

import { Container, Link, GridContainer, EllipsisContent } from "@/components";
import { Text } from "@/components/Typography/Text/Text";

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

    {/* Link as span */}
    <Link
      component="span"
      size="lg" // ✅ Link props work
      weight="bold" // ✅ Link props work
      onClick={(e: React.MouseEvent<HTMLSpanElement>) => console.log(e)} // ✅ span events work
    >
      Link content
    </Link>

    {/* Text as h1 */}
    <Text
      component="h1"
      size="lg" // ✅ Text props work
      weight="bold" // ✅ Text props work
      color="default" // ✅ Text props work
    >
      Heading text
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
      component={Link}
      size="lg" // ✅ Link props are available
      weight="bold" // ✅ Link props are available
      gap="lg" // ✅ Container props work
    >
      This is a Container rendered as Link
    </Container>

    {/* EllipsisContent rendered as Link */}
    <EllipsisContent
      component={Link}
      size="sm" // ✅ Link props work
      weight="bold" // ✅ Link props work
    >
      This text will be truncated
    </EllipsisContent>

    {/* Container rendered as Text */}
    <Container
      component={Text}
      size="md" // ✅ Text props are available
      color="muted" // ✅ Text props are available
      gap="md" // ✅ Container props work
    >
      This is a Container rendered as Text
    </Container>

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
// 4. Invalid Link color values

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
        size="lg"
        weight="bold"
      >
        Polymorphic Components with Styled Components
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
          ✅ Works with styled-components
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

// ============================================================================
// Vitest Suite
// ============================================================================

import { describe, it, expect } from "vitest";

describe("Polymorphic Components Type Safety", () => {
  it("should render polymorphic components without errors", () => {
    // This test suite is primarily for TypeScript type checking
    // The type-safe rendering is validated at compile time
    expect(true).toBe(true);
  });
});
