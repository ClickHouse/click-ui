import { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, ReactNode } from 'react';
import { Container } from '@/components/Container';
import { GridContainer } from '@/components/GridContainer';
import { TextField } from '@/components/TextField';
import { Select } from '@/components/Select';
import { Switch } from '@/components/Switch';
import { Separator } from '@/components/Separator';
import { Button } from '@/components/Button';
import { Title } from '@/components/Title';
import { Text } from '@/components/Text';

/**
 * Reference layout: the "Billing information" onboarding step.
 *
 *   Billing address        <- full width
 *   [ Address line 1     ] <- full width
 *   [ Address line 2     ] <- full width
 *   City        Zip        <- 2-up, must stack when narrow
 *   Country     State      <- 2-up, must stack when narrow
 *   (o) Shipping same...   <- switch + label, must NEVER stack
 *   ---------------------
 *   [Back]        [Next]   <- space-between, must NEVER stack
 *
 * Every approach below renders exactly this. The interesting question is not
 * "can it render at one width" — they all can — but what happens as the
 * *container* gets narrower, which is what actually happens in a dialog,
 * a side panel, or a split pane.
 */

const noop = () => undefined;

// ---------------------------------------------------------------------------
// shared leaf content (identical across all four approaches)
// ---------------------------------------------------------------------------

const Dots = () => (
  <div
    data-demo="dots"
    style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}
  >
    {[0, 1, 2].map(i => (
      <span
        key={i}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: i === 0 ? '#1f1f1f' : '#dcdcdc',
        }}
      />
    ))}
  </div>
);

const AddressLine1 = () => (
  <TextField
    label="Billing address"
    placeholder="Address line 1"
    value=""
    onChange={noop}
  />
);
const AddressLine2 = () => (
  <TextField
    placeholder="Address line 2 (optional)"
    value=""
    onChange={noop}
  />
);
const City = () => (
  <TextField
    label="City"
    value=""
    onChange={noop}
  />
);
const Zip = () => (
  <TextField
    label="Zip or postal code"
    value=""
    onChange={noop}
  />
);
const Country = () => (
  <Select
    label="Country"
    value=""
    onSelect={noop}
  >
    <Select.Item value="us">United States</Select.Item>
    <Select.Item value="uk">United Kingdom</Select.Item>
  </Select>
);
const StateProvince = () => (
  <Select
    label="State / County / Province"
    value=""
    onSelect={noop}
  >
    <Select.Item value="ca">California</Select.Item>
    <Select.Item value="ny">New York</Select.Item>
  </Select>
);
const ShippingToggle = () => (
  <Switch
    label="Shipping address same as billing address"
    dir="end"
    checked
  />
);
const BackButton = () => (
  <Button
    type="secondary"
    iconLeft="chevron-left"
  >
    Back
  </Button>
);
const NextButton = () => (
  <Button
    type="primary"
    iconRight="arrow-right"
  >
    Account details
  </Button>
);
const Heading = () => <Title type="h2">Billing information</Title>;

// ---------------------------------------------------------------------------
// A. Nested <Container>s, library defaults (isResponsive is ON by default)
//    This is the most direct translation of the Figma AutoLayout stack.
// ---------------------------------------------------------------------------

const ApproachA = () => (
  <Container
    orientation="vertical"
    gap="md"
    padding="lg"
    alignItems="stretch"
  >
    <Heading />
    <Dots />
    <Container
      orientation="vertical"
      gap="xs"
      alignItems="stretch"
    >
      <AddressLine1 />
      <AddressLine2 />
    </Container>

    <Container
      data-demo="pair-1"
      orientation="horizontal"
      gap="md"
      alignItems="start"
    >
      <City />
      <Zip />
    </Container>

    <Container
      data-demo="pair-2"
      orientation="horizontal"
      gap="md"
      alignItems="start"
    >
      <Country />
      <StateProvince />
    </Container>

    <Container
      data-demo="toggle-row"
      orientation="horizontal"
      gap="sm"
      alignItems="center"
    >
      <ShippingToggle />
    </Container>

    <Separator size="sm" />

    <Container
      data-demo="footer"
      orientation="horizontal"
      justifyContent="space-between"
      alignItems="center"
    >
      <BackButton />
      <NextButton />
    </Container>
  </Container>
);

// ---------------------------------------------------------------------------
// B. Nested <Container>s, isResponsive turned OFF, using intrinsic flex wrap
//    (wrap + grow + minWidth) so the pairs stack on *container* width.
// ---------------------------------------------------------------------------

const ApproachB = () => (
  <Container
    orientation="vertical"
    gap="md"
    padding="lg"
    alignItems="stretch"
    isResponsive={false}
  >
    <Heading />
    <Dots />
    <Container
      orientation="vertical"
      gap="xs"
      alignItems="stretch"
      isResponsive={false}
    >
      <AddressLine1 />
      <AddressLine2 />
    </Container>

    <Container
      data-demo="pair-1"
      orientation="horizontal"
      gap="md"
      alignItems="start"
      wrap="wrap"
      isResponsive={false}
    >
      <Container
        orientation="vertical"
        grow="1"
        minWidth="200px"
        isResponsive={false}
      >
        <City />
      </Container>
      <Container
        orientation="vertical"
        grow="1"
        minWidth="200px"
        isResponsive={false}
      >
        <Zip />
      </Container>
    </Container>

    <Container
      data-demo="pair-2"
      orientation="horizontal"
      gap="md"
      alignItems="start"
      wrap="wrap"
      isResponsive={false}
    >
      <Container
        orientation="vertical"
        grow="1"
        minWidth="200px"
        isResponsive={false}
      >
        <Country />
      </Container>
      <Container
        orientation="vertical"
        grow="1"
        minWidth="200px"
        isResponsive={false}
      >
        <StateProvince />
      </Container>
    </Container>

    <Container
      data-demo="toggle-row"
      orientation="horizontal"
      gap="sm"
      alignItems="center"
      isResponsive={false}
    >
      <ShippingToggle />
    </Container>

    <Separator size="sm" />

    <Container
      data-demo="footer"
      orientation="horizontal"
      justifyContent="space-between"
      alignItems="center"
      isResponsive={false}
    >
      <BackButton />
      <NextButton />
    </Container>
  </Container>
);

// ---------------------------------------------------------------------------
// C. One <GridContainer> with a fixed 2-column template + isResponsive ON.
//    Full-width rows need `gridColumn` spans, for which there is no prop —
//    so they go through inline style, escaping the design system.
// ---------------------------------------------------------------------------

const span2: CSSProperties = { gridColumn: 'span 2' };

const ApproachC = () => (
  <GridContainer
    gridTemplateColumns="1fr 1fr"
    gap="md"
    alignItems="start"
    style={{ padding: '24px' }}
  >
    <div style={span2}>
      <Heading />
    </div>
    <div style={span2}>
      <Dots />
    </div>
    <div style={span2}>
      <AddressLine1 />
    </div>
    <div style={span2}>
      <AddressLine2 />
    </div>

    <div data-demo="cell-city">
      <City />
    </div>
    <div data-demo="cell-zip">
      <Zip />
    </div>
    <div data-demo="cell-country">
      <Country />
    </div>
    <div data-demo="cell-state">
      <StateProvince />
    </div>

    <div
      data-demo="toggle-row"
      style={span2}
    >
      <ShippingToggle />
    </div>
    <div style={span2}>
      <Separator size="sm" />
    </div>
    <div style={span2}>
      <Container
        data-demo="footer"
        orientation="horizontal"
        justifyContent="space-between"
        alignItems="center"
        isResponsive={false}
      >
        <BackButton />
        <NextButton />
      </Container>
    </div>
  </GridContainer>
);

// ---------------------------------------------------------------------------
// D. One <GridContainer>, isResponsive OFF, with an intrinsic auto-fit track
//    list. This is the only approach that reflows on container width.
// ---------------------------------------------------------------------------

const spanAll: CSSProperties = { gridColumn: '1 / -1' };

const ApproachD = () => (
  <GridContainer
    isResponsive={false}
    gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
    gap="md"
    alignItems="start"
    style={{ padding: '24px' }}
  >
    <div style={spanAll}>
      <Heading />
    </div>
    <div style={spanAll}>
      <Dots />
    </div>
    <div style={spanAll}>
      <AddressLine1 />
    </div>
    <div style={spanAll}>
      <AddressLine2 />
    </div>

    <div data-demo="cell-city">
      <City />
    </div>
    <div data-demo="cell-zip">
      <Zip />
    </div>
    <div data-demo="cell-country">
      <Country />
    </div>
    <div data-demo="cell-state">
      <StateProvince />
    </div>

    <div
      data-demo="toggle-row"
      style={spanAll}
    >
      <ShippingToggle />
    </div>
    <div style={spanAll}>
      <Separator size="sm" />
    </div>
    <div style={spanAll}>
      <Container
        data-demo="footer"
        orientation="horizontal"
        justifyContent="space-between"
        alignItems="center"
        isResponsive={false}
      >
        <BackButton />
        <NextButton />
      </Container>
    </div>
  </GridContainer>
);

// ---------------------------------------------------------------------------
// harness
// ---------------------------------------------------------------------------

const APPROACHES = {
  a: {
    render: ApproachA,
    title: 'A — nested <Container>, library defaults',
    blurb:
      'isResponsive defaults to true, so every row flips to column at viewport ≤768px.',
  },
  b: {
    render: ApproachB,
    title: 'B — nested <Container>, isResponsive={false} + wrap/grow/minWidth',
    blurb:
      'Reflows on container width. Needs 4 extra wrapper Containers and isResponsive off everywhere.',
  },
  c: {
    render: ApproachC,
    title: 'C — one <GridContainer>, "1fr 1fr" + isResponsive',
    blurb:
      'Spans need inline gridColumn. Collapses on viewport ≤768px, never on container width.',
  },
  d: {
    render: ApproachD,
    title: 'D — one <GridContainer>, isResponsive={false} + auto-fit',
    blurb:
      'Reflows on container width. Requires turning isResponsive off and hand-written CSS strings.',
  },
} as const;

type ApproachKey = keyof typeof APPROACHES;

const Card = ({ width, children }: { width: string; children: ReactNode }) => (
  <div
    data-demo="card"
    style={{
      width,
      flex: '0 0 auto',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const Panel = ({ approach, width }: { approach: ApproachKey; width: string }) => {
  const { render: Render, title, blurb } = APPROACHES[approach];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <Text
          weight="semibold"
          size="md"
        >
          {title}
        </Text>
        <Text
          size="sm"
          color="muted"
        >
          {blurb}
        </Text>
      </div>
      <Card width={width}>
        <Render />
      </Card>
    </div>
  );
};

const meta: Meta = {
  title: 'Layout/Responsive Form Layout',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<{ containerWidth: string; approach: ApproachKey }>;

/**
 * All four approaches at one container width, so they can be compared directly.
 * Change `containerWidth` to simulate a dialog / side panel / split pane, and
 * separately resize the browser window to change the *viewport*. The point of
 * the demo is that those two are not the same thing.
 */
export const CompareAll: Story = {
  args: { containerWidth: '420px' },
  argTypes: {
    containerWidth: {
      control: 'select',
      options: ['320px', '360px', '420px', '520px', '720px', '100%'],
    },
  },
  render: ({ containerWidth }) => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-start',
        padding: '24px',
        background: '#fafafa',
        overflowX: 'auto',
      }}
    >
      {(Object.keys(APPROACHES) as ApproachKey[]).map(key => (
        <Panel
          key={key}
          approach={key}
          width={containerWidth}
        />
      ))}
    </div>
  ),
};

/** Single-approach stories, addressable individually for measurement. */
const single = (approach: ApproachKey): Story => ({
  args: { approach, containerWidth: '420px' },
  argTypes: {
    containerWidth: {
      control: 'select',
      options: ['320px', '360px', '420px', '520px', '720px', '100%'],
    },
  },
  render: ({ containerWidth }) => (
    <div style={{ padding: '24px', background: '#fafafa' }}>
      <Panel
        approach={approach}
        width={containerWidth}
      />
    </div>
  ),
});

export const ApproachAContainerDefaults = single('a');
export const ApproachBContainerIntrinsic = single('b');
export const ApproachCGridResponsive = single('c');
export const ApproachDGridAutoFit = single('d');

// ---------------------------------------------------------------------------
// Isolated diagnostics for the three primitive-level defects the comparison
// above runs into. Each is a minimal repro, independent of the billing form.
// ---------------------------------------------------------------------------

const Ruler = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <Text
      size="sm"
      weight="semibold"
    >
      {label}
    </Text>
    {children}
  </div>
);

/** Parent is exactly 360px and outlined in red. Anything crossing the red line
 *  is overflow. `Container` has no `box-sizing: border-box` and click-ui ships
 *  no global reset, so `fillWidth` (width:100%) + `padding` = width + padding. */
export const DefectPaddingOverflowsParent: StoryObj = {
  name: 'Defect 1 — padding overflows the parent',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '32px' }}
    >
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map(p => (
        <Ruler
          key={p}
          label={`<Container padding="${p}" />  inside a 360px parent`}
        >
          <div
            style={{
              width: '360px',
              outline: '2px solid #e5484d',
              outlineOffset: '0px',
            }}
          >
            <Container
              padding={p}
              orientation="vertical"
              isResponsive={false}
            >
              <div style={{ background: '#cfe8ff', height: '32px', width: '100%' }} />
            </Container>
          </div>
        </Ruler>
      ))}
    </div>
  ),
};

/** `isResponsive` (default true) sets `max-width: none` below 768px viewport,
 *  so a form card's own maxWidth is discarded exactly when space runs out.
 *  Resize the browser across 768px to watch the blue box jump to full width. */
export const DefectMaxWidthDroppedBelowBreakpoint: StoryObj = {
  name: 'Defect 2 — maxWidth is discarded below 768px',
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px' }}
    >
      <Text size="sm">
        Both boxes ask for maxWidth=&quot;480px&quot; inside a 900px parent. Resize the
        window across 768px.
      </Text>
      <div style={{ width: '900px', outline: '2px solid #e5484d' }}>
        <Ruler label="isResponsive (default) — maxWidth honoured only above 768px">
          <Container
            maxWidth="480px"
            padding="none"
          >
            <div style={{ background: '#cfe8ff', height: '32px', width: '100%' }} />
          </Container>
        </Ruler>
      </div>
      <div style={{ width: '900px', outline: '2px solid #30a46c' }}>
        <Ruler label="isResponsive={false} — maxWidth honoured, but now nothing stacks">
          <Container
            maxWidth="480px"
            padding="none"
            isResponsive={false}
          >
            <div style={{ background: '#cfe8ff', height: '32px', width: '100%' }} />
          </Container>
        </Ruler>
      </div>
    </div>
  ),
};

/** Same container width, different viewport. `isResponsive` keys off the
 *  viewport, so neither box knows it is only 360px wide. */
export const DefectViewportIsNotContainer: StoryObj = {
  name: 'Defect 3 — isResponsive keys off viewport, not container',
  render: () => (
    <div
      style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <Text size="sm">
        Both cards are 360px wide. Resize the window across 768px: the layout changes even
        though the cards never do. In a dialog or side panel the card width is what
        matters, and neither primitive can see it.
      </Text>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <Panel
          approach="a"
          width="360px"
        />
        <Panel
          approach="c"
          width="360px"
        />
      </div>
    </div>
  ),
};
