import { useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonGroup } from "./ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: "Buttons/ButtonGroup",
  tags: ["button-group", "autodocs"],
  render: ({ selected, ...props }) => {
    const [value, setValue] = useState(selected);

    return (
      <ButtonGroup
        {...props}
        selected={value}
        onClick={setValue}
      />
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    fillWidth: false,
    type: "default",
    selected: "option3",
  },
};

export const Variations: StoryObj<typeof ButtonGroup> = {
  render: () => (
    <div
      style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <section>
        <h3>Type: Default</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ButtonGroup
            type="default"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option1"
          />
          <ButtonGroup
            type="default"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option2"
          />
        </div>
      </section>

      <section>
        <h3>Type: Borderless</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ButtonGroup
            type="borderless"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option1"
          />
          <ButtonGroup
            type="borderless"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option2"
          />
        </div>
      </section>

      <section>
        <h3>Fill Width</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ButtonGroup
            type="default"
            fillWidth
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option2"
          />
          <ButtonGroup
            type="borderless"
            fillWidth
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option2"
          />
        </div>
      </section>

      <section>
        <h3>Many Options</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ButtonGroup
            type="default"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
              { label: "Option 4", value: "option4" },
              { label: "Option 5", value: "option5" },
            ]}
            selected="option3"
          />
        </div>
      </section>

      <section>
        <h3>Disabled State</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ButtonGroup
            type="default"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2", disabled: true },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option1"
          />
          <ButtonGroup
            type="borderless"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2", disabled: true },
              { label: "Option 3", value: "option3" },
            ]}
            selected="option1"
          />
        </div>
      </section>

      <section>
        <h3>No Selection</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ButtonGroup
            type="default"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiButton"],
      focus: [".cuiButton"],
      active: [".cuiButton"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
