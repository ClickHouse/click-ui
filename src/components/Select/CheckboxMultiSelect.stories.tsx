import { useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";

import { Panel } from "../Panel/Panel";
import { Text } from "../Typography/Text/Text";

import { CheckboxMultiSelect } from "./CheckboxMultiSelect";
import { selectOptions, selectOptionsLong } from "./selectOptions";
import { Spacer } from "../Spacer/Spacer";

const meta: Meta<typeof CheckboxMultiSelect> = {
  component: CheckboxMultiSelect,
  title: "Forms/CheckboxMultiSelect",
  tags: ["form-field", "select", "autodocs"],
};

export default meta;

export const OptionsAsChildren: StoryObj<typeof CheckboxMultiSelect> = {
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
        value={selectedValues}
        onSelect={setSelectedValues}
      >
        <CheckboxMultiSelect.Group heading="Group label">
          <CheckboxMultiSelect.Item
            value="content0"
            icon="user"
            iconDir="start"
          >
            Content0
          </CheckboxMultiSelect.Item>
        </CheckboxMultiSelect.Group>
        <div>
          <CheckboxMultiSelect.Item value="content1">
            Content1 long text content
          </CheckboxMultiSelect.Item>
        </div>
        <CheckboxMultiSelect.Item
          value="content2"
          label="Content2"
        />
        <CheckboxMultiSelect.Item value="content3">
          Content3
          <CheckboxMultiSelect.ItemDescription>
            Description of Content3
          </CheckboxMultiSelect.ItemDescription>
        </CheckboxMultiSelect.Item>
      </CheckboxMultiSelect>
    );
  },
};

export const OptionsAsProp: StoryObj<typeof CheckboxMultiSelect> = {
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

export const CheckboxMultiSelectVariants: StoryObj<typeof CheckboxMultiSelect> = {
  render: () => {
    const [selectedCount, setSetlectedCount] = useState<number>(0);

    const label = `Selected (${selectedCount})`;

    const handleSelect = (selectedVariants: Array<string>) => {
      setSetlectedCount(selectedVariants.length);
    };

    return (
      <CheckboxMultiSelect
        onSelect={handleSelect}
        placeholder={label}
        selectLabel={label}
      >
        <CheckboxMultiSelect.Item
          value="variant 1"
          variant="var1"
        >
          Variant 1
        </CheckboxMultiSelect.Item>
        <CheckboxMultiSelect.Item
          value="variant 2"
          variant="var2"
        >
          Variant 2
        </CheckboxMultiSelect.Item>
        <CheckboxMultiSelect.Item
          value="variant 4"
          variant="var4"
        >
          Variant 4
        </CheckboxMultiSelect.Item>
        <CheckboxMultiSelect.Item
          value="variant 6"
          variant="var6"
        >
          Variant 6
        </CheckboxMultiSelect.Item>
      </CheckboxMultiSelect>
    );
  },
};

export const Showcase: StoryObj<typeof CheckboxMultiSelect> = {
  render: () => {
    return (
      <>
        <Panel
          hasBorder
          width="300px"
        >
          <Text>With overflown options</Text>
          <CheckboxMultiSelect options={selectOptionsLong} />
        </Panel>

        <Spacer />
        <Panel
          hasBorder
          width="300px"
        >
          <Text>With overflown options (full width)</Text>
          <CheckboxMultiSelect
            useFullWidthItems
            options={selectOptionsLong}
          />
        </Panel>

        <Spacer />
        <Panel
          hasBorder
          width="300px"
        >
          <Text>Disabled</Text>
          <CheckboxMultiSelect
            disabled
            options={selectOptions}
          />
        </Panel>

        <Spacer />
        <Panel
          hasBorder
          width="300px"
        >
          <Text>With an error</Text>
          <CheckboxMultiSelect
            error="Incorrect value"
            options={selectOptions}
          />
        </Panel>

        <Spacer />
        <Panel
          hasBorder
          width="300px"
        >
          <Text>With disabled options</Text>
          <CheckboxMultiSelect
            options={[
              {
                value: "1",
                label: "Option 1 (disabled)",
                disabled: true,
              },
              {
                value: "2",
                label: "Option 2 (disabled)",
                disabled: true,
              },
              {
                value: "3",
                label: "Option 3",
              },
              {
                value: "4",
                label: "Option 4",
              },
            ]}
          />
        </Panel>

        <Spacer />
        <Panel
          hasBorder
          width="300px"
        >
          <Text>With search</Text>
          <CheckboxMultiSelect
            showSearch
            options={selectOptions}
          />
        </Panel>

        <Spacer />
        <Panel
          hasBorder
          width="300px"
        >
          <Text>With custom selected text</Text>
          <CheckboxMultiSelect
            selectLabel="Something is selected"
            options={selectOptions}
          />
        </Panel>
      </>
    );
  },
};
