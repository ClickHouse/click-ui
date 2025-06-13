import { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./MultiSelect";
import { selectOptions } from "./selectOptions";
import { useEffect, useState } from "react";

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  title: "Forms/MultiSelect",
  tags: ["form-field", "select", "autodocs"],
};

export default meta;

export const OptionsAsChildren: StoryObj<typeof MultiSelect> = {
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
        value={selectedValues}
        onSelect={setSelectedValues}
      >
        <MultiSelect.Group heading="Group label">
          <MultiSelect.Item
            value="content0"
            icon="user"
          >
            Content0
          </MultiSelect.Item>
        </MultiSelect.Group>
        <div>
          <MultiSelect.Item value="content1">Content1 long text content</MultiSelect.Item>
        </div>
        <MultiSelect.Item
          value="content2"
          label="Content2"
        />
        <MultiSelect.Item value="content3">
          Content3
          <MultiSelect.ItemDescription>
            Description of Content3
          </MultiSelect.ItemDescription>
        </MultiSelect.Item>
      </MultiSelect>
    );
  },
};

export const OptionsAsProp: StoryObj<typeof MultiSelect> = {
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
