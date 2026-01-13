import { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/components/Select/SingleSelect";
import { selectOptions } from "@/components/Select/selectOptions";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Forms/Select",
  tags: ["form-field", "select", "autodocs"],
};

export default meta;

export const Playground: StoryObj<typeof Select> = {
  args: {
    label: "Label",
  },
  render: props => (
    <Select
      options={selectOptions}
      {...props}
    />
  ),
};

export const Variations: StoryObj<typeof Select> = {
  render: () => (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "600px",
      }}
    >
      <section>
        <h3>Basic States</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="Default"
            placeholder="Select an option"
          >
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select>

          <Select
            label="With Value"
            value="option2"
            placeholder="Select an option"
          >
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select>

          <Select
            label="Disabled"
            disabled
            placeholder="Select an option"
          >
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </Select>

          <Select
            label="With Error"
            error="This field is required"
            placeholder="Select an option"
          >
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </Select>
        </div>
      </section>

      <section>
        <h3>With Icons</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="Items with Icons"
            placeholder="Select an option"
          >
            <Select.Item
              value="user"
              icon="user"
            >
              User
            </Select.Item>
            <Select.Item
              value="settings"
              icon="settings"
            >
              Settings
            </Select.Item>
            <Select.Item
              value="house"
              icon="home"
            >
              House
            </Select.Item>
          </Select>
        </div>
      </section>

      <section>
        <h3>With Descriptions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="Items with Descriptions"
            placeholder="Select an option"
          >
            <Select.Item value="option1">
              Option 1
              <Select.ItemDescription>Description for option 1</Select.ItemDescription>
            </Select.Item>
            <Select.Item value="option2">
              Option 2
              <Select.ItemDescription>Description for option 2</Select.ItemDescription>
            </Select.Item>
          </Select>
        </div>
      </section>

      <section>
        <h3>With Groups</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="Grouped Options"
            placeholder="Select an option"
          >
            <Select.Group heading="Group 1">
              <Select.Item value="g1-opt1">Group 1 Option 1</Select.Item>
              <Select.Item value="g1-opt2">Group 1 Option 2</Select.Item>
            </Select.Group>
            <Select.Group heading="Group 2">
              <Select.Item value="g2-opt1">Group 2 Option 1</Select.Item>
              <Select.Item value="g2-opt2">Group 2 Option 2</Select.Item>
            </Select.Group>
          </Select>
        </div>
      </section>

      <section>
        <h3>With Search</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="Searchable"
            showSearch
            placeholder="Search options..."
          >
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="cherry">Cherry</Select.Item>
            <Select.Item value="date">Date</Select.Item>
          </Select>
        </div>
      </section>

      <section>
        <h3>Disabled Items</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="With Disabled Items"
            placeholder="Select an option"
          >
            <Select.Item value="enabled1">Enabled Option 1</Select.Item>
            <Select.Item
              value="disabled1"
              disabled
            >
              Disabled Option 1
            </Select.Item>
            <Select.Item value="enabled2">Enabled Option 2</Select.Item>
            <Select.Item
              value="disabled2"
              disabled
            >
              Disabled Option 2
            </Select.Item>
          </Select>
        </div>
      </section>

      <section>
        <h3>Full Width Items</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Select
            label="Full Width"
            useFullWidthItems
            placeholder="Select an option"
          >
            <Select.Item value="long1">
              This is a very long option text that will use full width
            </Select.Item>
            <Select.Item value="long2">
              Another long option with full width display
            </Select.Item>
          </Select>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiStyledSelectTrigger", ".cuiSelectValue"],
      focus: [".cuiStyledSelectTrigger"],
    },
    chromatic: {
      delay: 300,
    },
  },
};
