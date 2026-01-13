import { Meta, StoryObj } from "@storybook/react-vite";
import { Menu, SplitButton } from "./SplitButton";

const menuItems: Array<Menu> = [
  {
    type: "group",
    items: [
      {
        label: "Content0",
      },
    ],
  },
  {
    icon: "code",
    iconDir: "start",
    label: "Content1",
  },
  {
    type: "sub-menu",
    icon: "code",
    label: "Hover Over Me",
    items: [
      {
        type: "group",
        items: [
          {
            label: "SubContent0",
          },
        ],
      },
      {
        label: "SubContent1",
      },
    ],
  },
  {
    icon: "code",
    iconDir: "end",
    label: "Content2",
  },
  {
    label: "Content3",
  },
];

const meta: Meta<typeof SplitButton> = {
  component: SplitButton,
  title: "Buttons/SplitButton",
  tags: ["split-button", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Playground: Story = {
  args: {
    side: "bottom",
    type: "primary",
    children: "Split button",
    menu: menuItems,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Type: Primary</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SplitButton
            type="primary"
            menu={menuItems}
          >
            Primary Split Button
          </SplitButton>
          <SplitButton
            type="primary"
            menu={menuItems}
            icon="code"
          >
            With Icon
          </SplitButton>
          <SplitButton
            type="primary"
            menu={menuItems}
            icon="code"
            iconDir="end"
          >
            Icon at End
          </SplitButton>
        </div>
      </section>

      <section>
        <h3>Type: Secondary</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SplitButton
            type="secondary"
            menu={menuItems}
          >
            Secondary Split Button
          </SplitButton>
          <SplitButton
            type="secondary"
            menu={menuItems}
            icon="code"
          >
            With Icon
          </SplitButton>
          <SplitButton
            type="secondary"
            menu={menuItems}
            icon="code"
            iconDir="end"
          >
            Icon at End
          </SplitButton>
        </div>
      </section>

      <section>
        <h3>Dropdown Side</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SplitButton
            type="primary"
            menu={menuItems}
            side="bottom"
          >
            Dropdown Bottom
          </SplitButton>
          <SplitButton
            type="primary"
            menu={menuItems}
            side="top"
          >
            Dropdown Top
          </SplitButton>
        </div>
      </section>

      <section>
        <h3>Disabled State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SplitButton
            type="primary"
            menu={menuItems}
            disabled
          >
            Disabled Primary
          </SplitButton>
          <SplitButton
            type="secondary"
            menu={menuItems}
            disabled
          >
            Disabled Secondary
          </SplitButton>
        </div>
      </section>

      <section>
        <h3>Fill Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SplitButton
            type="primary"
            menu={menuItems}
            fillWidth
          >
            Fill Width Primary
          </SplitButton>
          <SplitButton
            type="secondary"
            menu={menuItems}
            fillWidth
          >
            Fill Width Secondary
          </SplitButton>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiPrimaryButton", ".cuiSecondaryButton"],
      focus: [".cuiPrimaryButton", ".cuiSecondaryButton"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
