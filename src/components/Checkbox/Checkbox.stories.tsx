import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Forms/Checkbox",
  tags: ["checkbox", "autodocs"],
  render: ({ checked, ...props }) => {
    const [checkedState, setCheckedState] = useState(checked);

    useEffect(() => {
      setCheckedState(checked);
    }, [checked]);

    return (
      <Checkbox
        {...props}
        checked={checkedState}
        onCheckedChange={setCheckedState}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Variants</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Default variant"
            variant="default"
            checked={false}
          />
          <Checkbox
            label="Variant 1"
            variant="var1"
            checked={false}
          />
          <Checkbox
            label="Variant 2"
            variant="var2"
            checked={false}
          />
          <Checkbox
            label="Variant 3"
            variant="var3"
            checked={false}
          />
          <Checkbox
            label="Variant 4"
            variant="var4"
            checked={false}
          />
          <Checkbox
            label="Variant 5"
            variant="var5"
            checked={false}
          />
          <Checkbox
            label="Variant 6"
            variant="var6"
            checked={false}
          />
        </div>
      </section>

      <section>
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Unchecked"
            checked={false}
          />
          <Checkbox
            label="Checked"
            checked={true}
          />
          <Checkbox
            label="Indeterminate"
            checked="indeterminate"
          />
          <Checkbox
            label="Disabled"
            checked={false}
            disabled
          />
          <Checkbox
            label="Checked Disabled"
            checked={true}
            disabled
          />
          <Checkbox
            label="Indeterminate Disabled"
            checked="indeterminate"
            disabled
          />
        </div>
      </section>

      <section>
        <h3>Orientations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Horizontal (default)"
            orientation="horizontal"
            checked={false}
          />
          <Checkbox
            label="Vertical"
            orientation="vertical"
            checked={false}
          />
        </div>
      </section>

      <section>
        <h3>Label Position</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox
            label="Label at start"
            dir="start"
            checked={false}
          />
          <Checkbox
            label="Label at end (default)"
            dir="end"
            checked={false}
          />
        </div>
      </section>

      <section>
        <h3>Without Label</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Checkbox checked={false} />
          <Checkbox checked={true} />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiCheckInput"],
      focus: [".cuiCheckInput"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
