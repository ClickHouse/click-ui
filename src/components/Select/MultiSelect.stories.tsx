import { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "./MultiSelect";
import { selectOptions } from "./selectOptions";
import { useEffect, useState } from "react";

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  title: "Forms/MultiSelect",
  tags: ["form-field", "select", "autodocs"],
};

export default meta;

export const Playground: StoryObj<typeof MultiSelect> = {
  args: {
    label: "Label",
    value: ["content1"],
    showSearch: true,
  },
  render: ({ value, ...props }) => {
    const [selectedValues, setSelectedValues] = useState(value);

    useEffect(() => {
      setSelectedValues(value);
    }, [value]);

    return (
      <MultiSelect
        {...props}
        options={selectOptions}
        value={selectedValues}
        onSelect={setSelectedValues}
      />
    );
  },
};

export const Variations: StoryObj<typeof MultiSelect> = {
  render: () => {
    const [selected1, setSelected1] = useState<string[]>([]);
    const [selected2, setSelected2] = useState<string[]>(["option2", "option3"]);

    return (
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
            <MultiSelect
              label="Default (None Selected)"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <MultiSelect.Item value="option1">Option 1</MultiSelect.Item>
              <MultiSelect.Item value="option2">Option 2</MultiSelect.Item>
              <MultiSelect.Item value="option3">Option 3</MultiSelect.Item>
              <MultiSelect.Item value="option4">Option 4</MultiSelect.Item>
            </MultiSelect>

            <MultiSelect
              label="With Selected Values"
              value={selected2}
              onSelect={setSelected2}
              placeholder="Select options"
            >
              <MultiSelect.Item value="option1">Option 1</MultiSelect.Item>
              <MultiSelect.Item value="option2">Option 2</MultiSelect.Item>
              <MultiSelect.Item value="option3">Option 3</MultiSelect.Item>
              <MultiSelect.Item value="option4">Option 4</MultiSelect.Item>
            </MultiSelect>

            <MultiSelect
              label="Disabled"
              disabled
              value={selected2}
              onSelect={setSelected2}
              placeholder="Select options"
            >
              <MultiSelect.Item value="option1">Option 1</MultiSelect.Item>
              <MultiSelect.Item value="option2">Option 2</MultiSelect.Item>
            </MultiSelect>

            <MultiSelect
              label="With Error"
              error="Please select at least one option"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <MultiSelect.Item value="option1">Option 1</MultiSelect.Item>
              <MultiSelect.Item value="option2">Option 2</MultiSelect.Item>
            </MultiSelect>
          </div>
        </section>

        <section>
          <h3>With Icons</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <MultiSelect
              label="Items with Icons"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <MultiSelect.Item
                value="user"
                icon="user"
              >
                User
              </MultiSelect.Item>
              <MultiSelect.Item
                value="settings"
                icon="settings"
              >
                Settings
              </MultiSelect.Item>
              <MultiSelect.Item
                value="house"
                icon="home"
              >
                House
              </MultiSelect.Item>
            </MultiSelect>
          </div>
        </section>

        <section>
          <h3>With Descriptions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <MultiSelect
              label="Items with Descriptions"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <MultiSelect.Item value="option1">
                Option 1
                <MultiSelect.ItemDescription>
                  Description for option 1
                </MultiSelect.ItemDescription>
              </MultiSelect.Item>
              <MultiSelect.Item value="option2">
                Option 2
                <MultiSelect.ItemDescription>
                  Description for option 2
                </MultiSelect.ItemDescription>
              </MultiSelect.Item>
            </MultiSelect>
          </div>
        </section>

        <section>
          <h3>With Groups</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <MultiSelect
              label="Grouped Options"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <MultiSelect.Group heading="Group 1">
                <MultiSelect.Item value="g1-opt1">Group 1 Option 1</MultiSelect.Item>
                <MultiSelect.Item value="g1-opt2">Group 1 Option 2</MultiSelect.Item>
              </MultiSelect.Group>
              <MultiSelect.Group heading="Group 2">
                <MultiSelect.Item value="g2-opt1">Group 2 Option 1</MultiSelect.Item>
                <MultiSelect.Item value="g2-opt2">Group 2 Option 2</MultiSelect.Item>
              </MultiSelect.Group>
            </MultiSelect>
          </div>
        </section>

        <section>
          <h3>With Search</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <MultiSelect
              label="Searchable"
              showSearch
              value={selected1}
              onSelect={setSelected1}
              placeholder="Search options..."
            >
              <MultiSelect.Item value="apple">Apple</MultiSelect.Item>
              <MultiSelect.Item value="banana">Banana</MultiSelect.Item>
              <MultiSelect.Item value="cherry">Cherry</MultiSelect.Item>
              <MultiSelect.Item value="date">Date</MultiSelect.Item>
            </MultiSelect>
          </div>
        </section>

        <section>
          <h3>Sortable</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <MultiSelect
              label="Sortable Items"
              sortable
              value={selected2}
              onSelect={setSelected2}
              placeholder="Select and sort options"
            >
              <MultiSelect.Item value="option1">Option 1</MultiSelect.Item>
              <MultiSelect.Item value="option2">Option 2</MultiSelect.Item>
              <MultiSelect.Item value="option3">Option 3</MultiSelect.Item>
              <MultiSelect.Item value="option4">Option 4</MultiSelect.Item>
            </MultiSelect>
          </div>
        </section>
      </div>
    );
  },
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
