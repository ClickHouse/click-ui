import type { Meta, StoryObj } from "@storybook/react-vite";
import { GenericLabel } from "./GenericLabel";

const meta = {
  component: GenericLabel,
  title: "Forms/GenericLabel",
  tags: ["form-field", "generic-label", "autodocs"],
} satisfies Meta<typeof GenericLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    disabled: false,
    htmlFor: "test",
  },
  render: args => (
    <GenericLabel {...args}>
      Form Field generic label
      <input id="test" />
    </GenericLabel>
  ),
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiGenericLabel",
      focus: ".cuiGenericLabel",
      active: ".cuiGenericLabel",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <GenericLabel>Default Label</GenericLabel>
          </div>
          <div>
            <GenericLabel disabled>Disabled Label</GenericLabel>
          </div>
        </div>
      </section>

      <section>
        <h3>With Input Fields</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <GenericLabel htmlFor="generic-input1">
            Default Label
            <input
              id="generic-input1"
              type="text"
              placeholder="Enter text"
              style={{ marginTop: "4px" }}
            />
          </GenericLabel>
          <GenericLabel
            htmlFor="generic-input2"
            disabled
          >
            Disabled Label
            <input
              id="generic-input2"
              type="text"
              placeholder="Enter text"
              disabled
              style={{ marginTop: "4px" }}
            />
          </GenericLabel>
        </div>
      </section>

      <section>
        <h3>With Different Form Controls</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <GenericLabel htmlFor="generic-select1">
            Select Label
            <select
              id="generic-select1"
              style={{ marginTop: "4px", display: "block" }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </GenericLabel>
          <GenericLabel htmlFor="generic-textarea1">
            Textarea Label
            <textarea
              id="generic-textarea1"
              placeholder="Enter text"
              style={{ marginTop: "4px", display: "block" }}
            />
          </GenericLabel>
          <GenericLabel htmlFor="generic-checkbox1">
            <input
              id="generic-checkbox1"
              type="checkbox"
              style={{ marginRight: "8px" }}
            />
            Checkbox Label
          </GenericLabel>
          <GenericLabel htmlFor="generic-radio1">
            <input
              id="generic-radio1"
              type="radio"
              name="radio-group"
              style={{ marginRight: "8px" }}
            />
            Radio Label
          </GenericLabel>
        </div>
      </section>

      <section>
        <h3>Long Text</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <GenericLabel>
            This is a very long label that might wrap to multiple lines to test how the
            component handles longer text content
          </GenericLabel>
          <GenericLabel disabled>
            This is a very long disabled label that might wrap to multiple lines to test
            how the component handles longer text content in disabled state
          </GenericLabel>
        </div>
      </section>

      <section>
        <h3>Complex Content</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <GenericLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: "bold" }}>Primary Label</span>
              <span style={{ fontSize: "0.875rem", color: "#666" }}>
                Helper text description
              </span>
              <input
                type="text"
                placeholder="Input field"
              />
            </div>
          </GenericLabel>
        </div>
      </section>

      <section>
        <h3>State Comparison</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            <div>
              <GenericLabel>Default State</GenericLabel>
              <input
                type="text"
                style={{ marginTop: "4px", width: "100%" }}
              />
            </div>
            <div>
              <GenericLabel disabled>Disabled State</GenericLabel>
              <input
                type="text"
                disabled
                style={{ marginTop: "4px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
};
