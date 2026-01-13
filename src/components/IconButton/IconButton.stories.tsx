import { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Buttons/IconButton",
  tags: ["icon-button", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: {
    icon: "user",
    size: "default",
    disabled: false,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Button Types</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton
            type="primary"
            icon="user"
          />
          <IconButton
            type="secondary"
            icon="user"
          />
          <IconButton
            type="ghost"
            icon="user"
          />
          <IconButton
            type="danger"
            icon="user"
          />
          <IconButton
            type="info"
            icon="user"
          />
        </div>
      </section>

      <section>
        <h3>Button Sizes</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton
            size="default"
            icon="user"
          />
          <IconButton
            size="sm"
            icon="user"
          />
          <IconButton
            size="xs"
            icon="user"
          />
        </div>
      </section>

      <section>
        <h3>States - Primary</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton
            type="primary"
            icon="user"
          />
          <IconButton
            type="primary"
            icon="user"
            disabled
          />
        </div>
      </section>

      <section>
        <h3>States - Secondary</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton
            type="secondary"
            icon="user"
          />
          <IconButton
            type="secondary"
            icon="user"
            disabled
          />
        </div>
      </section>

      <section>
        <h3>States - Ghost</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton
            type="ghost"
            icon="user"
          />
          <IconButton
            type="ghost"
            icon="user"
            disabled
          />
        </div>
      </section>

      <section>
        <h3>Different Icons</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton icon="user" />
          <IconButton icon="settings" />
          <IconButton icon="home" />
          <IconButton icon="search" />
          <IconButton icon="cross" />
          <IconButton icon="check" />
        </div>
      </section>

      <section>
        <h3>All Types at Small Size</h3>
        <div
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <IconButton
            type="primary"
            icon="user"
            size="sm"
          />
          <IconButton
            type="secondary"
            icon="user"
            size="sm"
          />
          <IconButton
            type="ghost"
            icon="user"
            size="sm"
          />
          <IconButton
            type="danger"
            icon="user"
            size="sm"
          />
          <IconButton
            type="info"
            icon="user"
            size="sm"
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiIconButton"],
      focus: [".cuiIconButton"],
      active: [".cuiIconButton"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
