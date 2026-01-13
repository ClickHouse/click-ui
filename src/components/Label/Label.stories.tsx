import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta = {
  component: Label,
  title: "Forms/Label",
  tags: ["form-field", "label", "autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Form Field label",
    error: false,
    disabled: false,
  },
  render: args => (
    <Label {...args}>
      {args.children}
      <input id="test" />
    </Label>
  ),
};

export const Variations: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: ".cuiLabel",
      focus: ".cuiLabel",
      active: ".cuiLabel",
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section>
        <h3>States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label>Default Label</Label>
          </div>
          <div>
            <Label error>Error Label</Label>
          </div>
          <div>
            <Label disabled>Disabled Label</Label>
          </div>
        </div>
      </section>

      <section>
        <h3>With Input Fields</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Label htmlFor="input1">
            Default Label
            <input
              id="input1"
              type="text"
              placeholder="Enter text"
              style={{ marginTop: "4px" }}
            />
          </Label>
          <Label
            htmlFor="input2"
            error
          >
            Error Label
            <input
              id="input2"
              type="text"
              placeholder="Enter text"
              style={{ marginTop: "4px" }}
            />
          </Label>
          <Label
            htmlFor="input3"
            disabled
          >
            Disabled Label
            <input
              id="input3"
              type="text"
              placeholder="Enter text"
              disabled
              style={{ marginTop: "4px" }}
            />
          </Label>
        </div>
      </section>

      <section>
        <h3>With Different Form Controls</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Label htmlFor="select1">
            Select Label
            <select
              id="select1"
              style={{ marginTop: "4px", display: "block" }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </Label>
          <Label htmlFor="textarea1">
            Textarea Label
            <textarea
              id="textarea1"
              placeholder="Enter text"
              style={{ marginTop: "4px", display: "block" }}
            />
          </Label>
          <Label htmlFor="checkbox1">
            <input
              id="checkbox1"
              type="checkbox"
              style={{ marginRight: "8px" }}
            />
            Checkbox Label
          </Label>
        </div>
      </section>

      <section>
        <h3>Long Text</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Label>
            This is a very long label that might wrap to multiple lines to test how the
            component handles longer text content
          </Label>
          <Label error>
            This is a very long error label that might wrap to multiple lines to test how
            the component handles longer text content in error state
          </Label>
          <Label disabled>
            This is a very long disabled label that might wrap to multiple lines to test
            how the component handles longer text content in disabled state
          </Label>
        </div>
      </section>

      <section>
        <h3>State Combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            <div>
              <Label>Default</Label>
              <input
                type="text"
                style={{ marginTop: "4px", width: "100%" }}
              />
            </div>
            <div>
              <Label error>Error</Label>
              <input
                type="text"
                style={{ marginTop: "4px", width: "100%" }}
              />
            </div>
            <div>
              <Label disabled>Disabled</Label>
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
