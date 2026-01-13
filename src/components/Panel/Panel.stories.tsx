import { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./Panel";
import { Text } from "@/components/Typography/Text/Text";
import { Title } from "@/components/Typography/Title/Title";

const meta: Meta<typeof Panel> = {
  component: Panel,
  title: "Display/Panel",
  tags: ["panel", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const Playground: Story = {
  args: {
    alignItems: "start",
    color: "default",
    cursor: "auto",
    fillHeight: false,
    fillWidth: false,
    hasBorder: true,
    hasShadow: true,
    height: "",
    orientation: "vertical",
    padding: "md",
    radii: "sm",
    width: "50%",
    children: (
      <>
        <Title type="h3">Example panel title</Title>
        <Text
          size="md"
          color="default"
        >
          Panel content
        </Text>
      </>
    ),
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Colors</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            color="default"
            padding="md"
            hasBorder
          >
            <Title type="h3">Default Color</Title>
            <Text>Panel with default background color.</Text>
          </Panel>
          <Panel
            color="muted"
            padding="md"
            hasBorder
          >
            <Title type="h3">Muted Color</Title>
            <Text>Panel with muted background color.</Text>
          </Panel>
          <Panel
            color="transparent"
            padding="md"
            hasBorder
          >
            <Title type="h3">Transparent</Title>
            <Text>Panel with transparent background.</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Padding Options</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            padding="none"
            hasBorder
          >
            <Text>No Padding</Text>
          </Panel>
          <Panel
            padding="xs"
            hasBorder
          >
            <Text>XS Padding</Text>
          </Panel>
          <Panel
            padding="sm"
            hasBorder
          >
            <Text>SM Padding</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
          >
            <Text>MD Padding</Text>
          </Panel>
          <Panel
            padding="lg"
            hasBorder
          >
            <Text>LG Padding</Text>
          </Panel>
          <Panel
            padding="xl"
            hasBorder
          >
            <Text>XL Padding</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Border Radius</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            radii="none"
            padding="md"
            hasBorder
          >
            <Text>None</Text>
          </Panel>
          <Panel
            radii="sm"
            padding="md"
            hasBorder
          >
            <Text>Small</Text>
          </Panel>
          <Panel
            radii="md"
            padding="md"
            hasBorder
          >
            <Text>Medium</Text>
          </Panel>
          <Panel
            radii="lg"
            padding="md"
            hasBorder
          >
            <Text>Large</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Border & Shadow</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            padding="md"
            hasBorder={false}
            hasShadow={false}
          >
            <Title type="h3">No Border or Shadow</Title>
            <Text>Panel without border or shadow.</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder={true}
            hasShadow={false}
          >
            <Title type="h3">Border Only</Title>
            <Text>Panel with border, no shadow.</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder={false}
            hasShadow={true}
          >
            <Title type="h3">Shadow Only</Title>
            <Text>Panel with shadow, no border.</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder={true}
            hasShadow={true}
          >
            <Title type="h3">Border & Shadow</Title>
            <Text>Panel with both border and shadow.</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Orientation</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            orientation="horizontal"
            padding="md"
            hasBorder
            gap="md"
          >
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
          </Panel>
          <Panel
            orientation="vertical"
            padding="md"
            hasBorder
            gap="md"
          >
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Alignment</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            alignItems="start"
            padding="md"
            hasBorder
            height="150px"
          >
            <Title type="h3">Start</Title>
            <Text>Aligned to start</Text>
          </Panel>
          <Panel
            alignItems="center"
            padding="md"
            hasBorder
            height="150px"
          >
            <Title type="h3">Center</Title>
            <Text>Aligned to center</Text>
          </Panel>
          <Panel
            alignItems="end"
            padding="md"
            hasBorder
            height="150px"
          >
            <Title type="h3">End</Title>
            <Text>Aligned to end</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Gap Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            padding="md"
            hasBorder
            gap="none"
          >
            <Text>No Gap</Text>
            <Text>Between Items</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            gap="sm"
          >
            <Text>Small Gap</Text>
            <Text>Between Items</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            gap="md"
          >
            <Text>Medium Gap</Text>
            <Text>Between Items</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            gap="lg"
          >
            <Text>Large Gap</Text>
            <Text>Between Items</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Width & Height Options</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            padding="md"
            hasBorder
            fillWidth={false}
            width="300px"
          >
            <Text>Fixed Width (300px)</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            fillWidth={true}
          >
            <Text>Fill Width</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            height="100px"
          >
            <Text>Fixed Height (100px)</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            fillHeight={false}
            height="150px"
            width="300px"
          >
            <Text>Fixed Width & Height</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Cursor Options</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            padding="md"
            hasBorder
            cursor="pointer"
          >
            <Text>Pointer Cursor</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            cursor="help"
          >
            <Text>Help Cursor</Text>
          </Panel>
          <Panel
            padding="md"
            hasBorder
            cursor="not-allowed"
          >
            <Text>Not Allowed</Text>
          </Panel>
        </div>
      </section>

      <section>
        <h3>Complex Combinations</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Panel
            color="default"
            padding="lg"
            radii="lg"
            hasBorder={true}
            hasShadow={true}
            orientation="vertical"
            gap="md"
            alignItems="start"
          >
            <Title type="h3">Feature Card</Title>
            <Text>A panel with all features enabled.</Text>
            <Text color="muted">Perfect for showcasing content.</Text>
          </Panel>
          <Panel
            color="muted"
            padding="md"
            radii="sm"
            hasBorder={true}
            hasShadow={false}
            orientation="horizontal"
            gap="sm"
            alignItems="center"
          >
            <Text>Horizontal</Text>
            <Text>Layout</Text>
            <Text>Example</Text>
          </Panel>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {},
  },
};
