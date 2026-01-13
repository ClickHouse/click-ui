import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react-vite";

import { CheckboxMultiSelect } from "./CheckboxMultiSelect";
import { selectOptions } from "./selectOptions";

const meta: Meta<typeof CheckboxMultiSelect> = {
  component: CheckboxMultiSelect,
  title: "Forms/CheckboxMultiSelect",
  tags: ["form-field", "select", "autodocs"],
};

export default meta;

export const Playground: StoryObj<typeof CheckboxMultiSelect> = {
  args: {
    label: "Label",
    value: ["content1"],
    showSearch: false,
    selectLabel: "Columns",
  },
  render: ({ value, ...props }) => {
    const [selectedValues, setSelectedValues] = useState(value);

    useEffect(() => {
      setSelectedValues(value);
    }, [value]);

    return (
      <CheckboxMultiSelect
        {...props}
        options={selectOptions}
        value={selectedValues}
        onSelect={value => setSelectedValues(value)}
      />
    );
  },
};

export const Variations: StoryObj<typeof CheckboxMultiSelect> = {
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
            <CheckboxMultiSelect
              label="Default (None Selected)"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Item value="option1">
                Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option2">
                Option 2
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option3">
                Option 3
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option4">
                Option 4
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>

            <CheckboxMultiSelect
              label="With Selected Values"
              value={selected2}
              onSelect={setSelected2}
              selectLabel="Selected (2)"
            >
              <CheckboxMultiSelect.Item value="option1">
                Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option2">
                Option 2
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option3">
                Option 3
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option4">
                Option 4
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>

            <CheckboxMultiSelect
              label="Disabled"
              disabled
              value={selected2}
              onSelect={setSelected2}
              selectLabel="Selected (2)"
            >
              <CheckboxMultiSelect.Item value="option1">
                Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option2">
                Option 2
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>

            <CheckboxMultiSelect
              label="With Error"
              error="Please select at least one option"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Item value="option1">
                Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option2">
                Option 2
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>With Icons</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="Items with Icons"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Item
                value="user"
                icon="user"
                iconDir="start"
              >
                User
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item
                value="settings"
                icon="settings"
                iconDir="start"
              >
                Settings
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item
                value="home"
                icon="home"
                iconDir="start"
              >
                House
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>With Descriptions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="Items with Descriptions"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Item value="option1">
                Option 1
                <CheckboxMultiSelect.ItemDescription>
                  Description for option 1
                </CheckboxMultiSelect.ItemDescription>
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option2">
                Option 2
                <CheckboxMultiSelect.ItemDescription>
                  Description for option 2
                </CheckboxMultiSelect.ItemDescription>
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>With Groups</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="Grouped Options"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Group heading="Group 1">
                <CheckboxMultiSelect.Item value="g1-opt1">
                  Group 1 Option 1
                </CheckboxMultiSelect.Item>
                <CheckboxMultiSelect.Item value="g1-opt2">
                  Group 1 Option 2
                </CheckboxMultiSelect.Item>
              </CheckboxMultiSelect.Group>
              <CheckboxMultiSelect.Group heading="Group 2">
                <CheckboxMultiSelect.Item value="g2-opt1">
                  Group 2 Option 1
                </CheckboxMultiSelect.Item>
                <CheckboxMultiSelect.Item value="g2-opt2">
                  Group 2 Option 2
                </CheckboxMultiSelect.Item>
              </CheckboxMultiSelect.Group>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>With Search</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="Searchable"
              showSearch
              value={selected1}
              onSelect={setSelected1}
              placeholder="Search options..."
            >
              <CheckboxMultiSelect.Item value="apple">Apple</CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="banana">Banana</CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="cherry">Cherry</CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="date">Date</CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>Disabled Items</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="With Disabled Items"
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Item value="enabled1">
                Enabled Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item
                value="disabled1"
                disabled
              >
                Disabled Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="enabled2">
                Enabled Option 2
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item
                value="disabled2"
                disabled
              >
                Disabled Option 2
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>Full Width Items</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="Full Width"
              useFullWidthItems
              value={selected1}
              onSelect={setSelected1}
              placeholder="Select options"
            >
              <CheckboxMultiSelect.Item value="long1">
                This is a very long option text that will use full width
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="long2">
                Another long option with full width display
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
          </div>
        </section>

        <section>
          <h3>Custom Select Label</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <CheckboxMultiSelect
              label="Custom Text"
              value={selected2}
              onSelect={setSelected2}
              selectLabel="Multiple items selected"
            >
              <CheckboxMultiSelect.Item value="option1">
                Option 1
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option2">
                Option 2
              </CheckboxMultiSelect.Item>
              <CheckboxMultiSelect.Item value="option3">
                Option 3
              </CheckboxMultiSelect.Item>
            </CheckboxMultiSelect>
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
