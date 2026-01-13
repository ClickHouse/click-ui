import { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  component: Text,
  title: "Typography/Text",
  tags: ["text", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  args: {
    size: "md",
    weight: "normal",
    color: "default",
    align: "left",
    children: "Query billions of rows in milliseconds",
  },
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiText",
      focus: ".cuiText",
      active: ".cuiText",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Sizes</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text size="xs">Extra Small Text - xs</Text>
          <Text size="sm">Small Text - sm</Text>
          <Text size="md">Medium Text - md</Text>
          <Text size="lg">Large Text - lg</Text>
          <Text size="xl">Extra Large Text - xl</Text>
        </div>
      </section>

      <section>
        <h3>Weights</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text weight="normal">Normal Weight</Text>
          <Text weight="medium">Medium Weight</Text>
          <Text weight="semibold">Semibold Weight</Text>
          <Text weight="bold">Bold Weight</Text>
        </div>
      </section>

      <section>
        <h3>Colors</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text color="default">Default Color</Text>
          <Text color="muted">Muted Color</Text>
          <Text color="danger">Danger Color</Text>
          <Text color="disabled">Disabled Color</Text>
        </div>
      </section>

      <section>
        <h3>Alignments</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text align="left">Left Aligned</Text>
          <Text align="center">Center Aligned</Text>
          <Text align="right">Right Aligned</Text>
        </div>
      </section>

      <section>
        <h3>Size & Weight Combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text
            size="sm"
            weight="normal"
          >
            Small Normal
          </Text>
          <Text
            size="md"
            weight="medium"
          >
            Medium Medium
          </Text>
          <Text
            size="lg"
            weight="semibold"
          >
            Large Semibold
          </Text>
          <Text
            size="xl"
            weight="bold"
          >
            Extra Large Bold
          </Text>
        </div>
      </section>

      <section>
        <h3>Fill Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text fillWidth>Full Width Text</Text>
          <Text>Auto Width Text</Text>
        </div>
      </section>

      <section>
        <h3>Polymorphic (Different Elements)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Text component="p">Paragraph (p)</Text>
          <Text component="span">Span Element</Text>
          <Text component="div">Div Element</Text>
        </div>
      </section>
    </div>
  ),
};
