import { MultiSelect, MultiSelectProps } from "./MultiSelect";
import { selectOptions } from "./selectOptions";
import { useEffect, useState } from "react";
interface Props extends Omit<MultiSelectProps, "value"> {
  value: string;
  childrenType: "children" | "options";
}
const MultiSelectExample = ({ childrenType, value, ...props }: Props) => {
  const [selectedValues, setSelectedValues] = useState(
    value ? value.split(",") : undefined
  );
  useEffect(() => {
    setSelectedValues(value ? value.split(",") : undefined);
  }, [value]);

  if (childrenType === "options") {
    return (
      <MultiSelect
        value={selectedValues}
        options={selectOptions}
        onSelect={value => setSelectedValues(value)}
        {...props}
      />
    );
  }
  return (
    <MultiSelect
      value={selectedValues}
      onSelect={value => setSelectedValues(value)}
      {...props}
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
      <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
    </MultiSelect>
  );
};
export default {
  component: MultiSelectExample,
  title: "Forms/MultiSelect",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    sortable: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    name: { control: "text" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    form: { control: "text" },
    allowCreateOption: { control: "boolean" },
    showCheck: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground = {
  args: {
    label: "Label",
    value: "content1",
    showSearch: true,
    childrenType: "children",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { allowCreateOption, childrenType, value, ...props } = story.args;
          return `<MultiSelect\n  value={${JSON.stringify((value ?? "").split(","))}}\n${
            allowCreateOption ? "  allowCreateOption\n" : ""
          }
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
  childrenType !== "options"
    ? `
    <MultiSelect.Group heading="Group label">
      <MultiSelect.Item value="content0" icon="user">
        Content0
      </MultiSelect.Item>
    </MultiSelect.Group>
    <div>
      <MultiSelect.Item value="content1">Content1 long text content</MultiSelect.Item>
    </div>
    <MultiSelect.Item
      value="content2"
      disabled
    >
      Content2
    </MultiSelect.Item>
    <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
</MultiSelect>
`
    : ""
}`;
        },
      },
    },
  },
};
