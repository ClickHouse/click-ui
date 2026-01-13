import { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Forms/Switch",
  tags: ["switch", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: args => {
    const [isChecked, setIsChecked] = useState(args.checked);

    return (
      <Switch
        {...args}
        checked={isChecked}
        onCheckedChange={setIsChecked}
      />
    );
  },
  args: {
    checked: true,
    disabled: false,
    label: "Switch label",
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            label="Unchecked"
            checked={false}
            onCheckedChange={() => {}}
          />
          <Switch
            label="Checked"
            checked={true}
            onCheckedChange={() => {}}
          />
          <Switch
            label="Unchecked Disabled"
            checked={false}
            disabled
            onCheckedChange={() => {}}
          />
          <Switch
            label="Checked Disabled"
            checked={true}
            disabled
            onCheckedChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Orientations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            label="Vertical (default)"
            orientation="vertical"
            checked={false}
            onCheckedChange={() => {}}
          />
          <Switch
            label="Horizontal"
            orientation="horizontal"
            checked={false}
            onCheckedChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Label Position</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            label="Label at start (default)"
            dir="start"
            checked={false}
            onCheckedChange={() => {}}
          />
          <Switch
            label="Label at end"
            dir="end"
            checked={false}
            onCheckedChange={() => {}}
          />
        </div>
      </section>

      <section>
        <h3>Without Label</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Switch
            checked={false}
            onCheckedChange={() => {}}
          />
          <Switch
            checked={true}
            onCheckedChange={() => {}}
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiSwitchRoot"],
      focus: [".cuiSwitchRoot"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
