import { MultiSelectProps } from "..";
import { CheckboxMultiSelect } from "./CheckboxMultiSelect";
import { selectOptions } from "./selectOptions";
import { useEffect, useState } from "react";
interface Props extends Omit<MultiSelectProps, "value"> {
  value: string;
  childrenType: "children" | "options";
}
const CheckboxMultiSelectExample = ({ childrenType, value, ...props }: Props) => {
  const [selectedValues, setSelectedValues] = useState(
    value ? value.split(",") : undefined
  );
  useEffect(() => {
    setSelectedValues(value ? value.split(",") : undefined);
  }, [value]);

  if (childrenType === "options") {
    return (
      <CheckboxMultiSelect
        value={selectedValues}
        options={selectOptions}
        onSelect={value => setSelectedValues(value)}
        selectLabel="Columns;"
        {...props}
      />
    );
  }
  return (
    <CheckboxMultiSelect
      value={value ? value.split(",") : undefined}
      selectLabel="Columns"
      {...props}
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
      <CheckboxMultiSelect.Item value="content3">Content3</CheckboxMultiSelect.Item>
    </CheckboxMultiSelect>
  );
};
export default {
  component: CheckboxMultiSelectExample,
  title: "Forms/CheckboxMultiSelect",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    sortable: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    childrenType: { control: "radio", options: ["children", "options"] },
    name: { control: "text" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    form: { control: "text" },
    allowCreateOption: { control: "boolean" },
    showCheck: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    selectLabel: { control: "text" },
  },
};

export const Playground = {
  args: {
    label: "Label",
    value: "content1",
    showSearch: false,
    childrenType: "children",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { allowCreateOption, childrenType, value, ...props } = story.args;
          return `<CheckboxMultiSelect\n  value={${JSON.stringify(
            (value ?? "").split(",")
          )}}\n${allowCreateOption ? "  allowCreateOption\n" : ""}
          ${Object.entries(props)
            .flatMap(([key, value]) =>
              typeof value === "boolean"
                ? value
                  ? `  ${key}`
                  : []
                : `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
            )
            .join("\n")}
${
  childrenType === "options"
    ? `options={${JSON.stringify(selectOptions, null, 2)}}\n/`
    : ""
}>
${
  childrenType === "children"
    ? `
    <CheckboxMultiSelect.Group heading="Group label">
      <CheckboxMultiSelect.Item value="content0" icon="user">
        Content0
      </CheckboxMultiSelect.Item>
    </CheckboxMultiSelect.Group>
    <div>
      <CheckboxMultiSelect.Item value="content1">Content1 long text content</CheckboxMultiSelect.Item>
    </div>
    <CheckboxMultiSelect.Item
      value="content2"
      disabled
    >
      Content2
    </CheckboxMultiSelect.Item>
    <CheckboxMultiSelect.Item value="content3">Content3</CheckboxMultiSelect.Item>
</CheckboxMultiSelect>
`
    : ""
}`;
        },
      },
    },
  },
};

export const CheckboxMultiSelectVariants = {
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
