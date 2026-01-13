import { Meta, StoryObj } from "@storybook/react-vite";
import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Typography/Title",
  tags: ["title", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Playground: Story = {
  args: {
    size: "md",
    type: "h1",
    family: "product",
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
      hover: ".cuiTitle",
      focus: ".cuiTitle",
      active: ".cuiTitle",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>Heading Levels (Types)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title type="h1">Heading 1</Title>
          <Title type="h2">Heading 2</Title>
          <Title type="h3">Heading 3</Title>
          <Title type="h4">Heading 4</Title>
          <Title type="h5">Heading 5</Title>
          <Title type="h6">Heading 6</Title>
        </div>
      </section>

      <section>
        <h3>Sizes (Product Family)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title
            type="h2"
            family="product"
            size="xs"
          >
            Extra Small - xs
          </Title>
          <Title
            type="h2"
            family="product"
            size="sm"
          >
            Small - sm
          </Title>
          <Title
            type="h2"
            family="product"
            size="md"
          >
            Medium - md
          </Title>
          <Title
            type="h2"
            family="product"
            size="lg"
          >
            Large - lg
          </Title>
          <Title
            type="h2"
            family="product"
            size="xl"
          >
            Extra Large - xl
          </Title>
        </div>
      </section>

      <section>
        <h3>Sizes (Brand Family)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title
            type="h2"
            family="brand"
            size="xs"
          >
            Extra Small - xs
          </Title>
          <Title
            type="h2"
            family="brand"
            size="sm"
          >
            Small - sm
          </Title>
          <Title
            type="h2"
            family="brand"
            size="md"
          >
            Medium - md
          </Title>
          <Title
            type="h2"
            family="brand"
            size="lg"
          >
            Large - lg
          </Title>
          <Title
            type="h2"
            family="brand"
            size="xl"
          >
            Extra Large - xl
          </Title>
        </div>
      </section>

      <section>
        <h3>Font Families</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title
            type="h2"
            family="product"
          >
            Product Family
          </Title>
          <Title
            type="h2"
            family="brand"
          >
            Brand Family
          </Title>
        </div>
      </section>

      <section>
        <h3>Colors</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title
            type="h2"
            color="default"
          >
            Default Color
          </Title>
          <Title
            type="h2"
            color="muted"
          >
            Muted Color
          </Title>
        </div>
      </section>

      <section>
        <h3>Alignments</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title
            type="h2"
            align="left"
          >
            Left Aligned
          </Title>
          <Title
            type="h2"
            align="center"
          >
            Center Aligned
          </Title>
          <Title
            type="h2"
            align="right"
          >
            Right Aligned
          </Title>
        </div>
      </section>

      <section>
        <h3>Combined Variations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Title
            type="h1"
            family="product"
            size="xl"
            color="default"
          >
            Large Product Title
          </Title>
          <Title
            type="h2"
            family="brand"
            size="lg"
            color="muted"
          >
            Brand Muted Subtitle
          </Title>
          <Title
            type="h3"
            family="product"
            size="md"
            align="center"
          >
            Centered Medium Title
          </Title>
        </div>
      </section>
    </div>
  ),
};
