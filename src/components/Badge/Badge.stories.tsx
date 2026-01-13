import { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Display/Badge",
  tags: ["badge", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    text: "experiment",
    state: "success",
    size: "md",
    type: "opaque",
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Badge States - Opaque</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Badge
            text="Default"
            state="default"
            type="opaque"
          />
          <Badge
            text="Success"
            state="success"
            type="opaque"
          />
          <Badge
            text="Neutral"
            state="neutral"
            type="opaque"
          />
          <Badge
            text="Danger"
            state="danger"
            type="opaque"
          />
          <Badge
            text="Warning"
            state="warning"
            type="opaque"
          />
          <Badge
            text="Info"
            state="info"
            type="opaque"
          />
          <Badge
            text="Disabled"
            state="disabled"
            type="opaque"
          />
        </div>
      </section>

      <section>
        <h3>Badge States - Solid</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Badge
            text="Default"
            state="default"
            type="solid"
          />
          <Badge
            text="Success"
            state="success"
            type="solid"
          />
          <Badge
            text="Neutral"
            state="neutral"
            type="solid"
          />
          <Badge
            text="Danger"
            state="danger"
            type="solid"
          />
          <Badge
            text="Warning"
            state="warning"
            type="solid"
          />
          <Badge
            text="Info"
            state="info"
            type="solid"
          />
          <Badge
            text="Disabled"
            state="disabled"
            type="solid"
          />
        </div>
      </section>

      <section>
        <h3>Badge Sizes</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Badge
            text="Small"
            size="sm"
            state="success"
          />
          <Badge
            text="Medium"
            size="md"
            state="success"
          />
        </div>
      </section>

      <section>
        <h3>With Icons</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Badge
            text="Icon Left"
            icon="user"
            iconDir="start"
            state="success"
          />
          <Badge
            text="Icon Right"
            icon="user"
            iconDir="end"
            state="success"
          />
        </div>
      </section>

      <section>
        <h3>Dismissible Badges</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Badge
            text="Dismissible"
            state="success"
            dismissible
            onClose={() => {}}
          />
          <Badge
            text="With Icon"
            icon="user"
            state="info"
            dismissible
            onClose={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Long Text</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "300px",
          }}
        >
          <Badge
            text="This is a very long badge text that should be truncated with ellipsis"
            state="neutral"
            ellipsisContent
          />
          <Badge
            text="This text does not truncate because ellipsis is disabled"
            state="neutral"
            ellipsisContent={false}
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiWrapper"],
      focus: [".cuiWrapper"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
