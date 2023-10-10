import { Select, SelectProps } from "./SingleSelect";
import { Preview } from "@storybook/react";
import { selectOptions } from "./selectOptions";
import { useEffect, useState } from "react";
interface Props extends SelectProps {
  clickableNoData?: boolean;
  childrenType: "children" | "options";
}
const SelectExample = ({ clickableNoData, childrenType, value, ...props }: Props) => {
  const [selectedValue, setSelectedValue] = useState(value);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  if (childrenType === "options") {
    return (
      <Select
        value={selectedValue}
        onSelect={value => setSelectedValue(value)}
        onCreateOption={
          clickableNoData ? search => console.log("Clicked ", search) : undefined
        }
        options={selectOptions}
        {...props}
      />
    );
  }
  return (
    <Select
      value={value}
      onCreateOption={
        clickableNoData ? search => console.log("Clicked ", search) : undefined
      }
      {...props}
    >
      <Select.Group heading="Group label">
        <Select.Item
          value="content0"
          icon="user"
        >
          Content0
        </Select.Item>
      </Select.Group>
      <div>
        <Select.Item value="content1">Content1 long text content</Select.Item>
      </div>
      <Select.Item
        value="content2"
        disabled
      >
        Content2
      </Select.Item>
      <Select.Item value="content3">Content3</Select.Item>
      <Select.Item
        value="content4"
        label="Content4"
      />
    </Select>
  );
};

export default {
  component: SelectExample,
  title: "Forms/Select",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    name: { control: "text" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    form: { control: "text" },
    clickableNoData: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    childrenType: { control: "inline-radio", options: ["children", "options"] },
  },
};

export const Playground: Preview = {
  args: {
    label: "Label",
    childrenType: "children",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { clickableNoData, childrenType, value, ...props } = story.args;
          return `<Select\n  value={${value}}\n${
            clickableNoData
              ? "  onCreateOption={search => console.log('Clicked ', search)}\n"
              : ""
          }${Object.entries(props)
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
    <Select.Group heading="Group label">
      <Select.Item value="content0">
        <Icon name="user" />
        Content0
      </Select.Item>
    </Select.Group>
    <div>
      <Select.Item value="content1">Content1 long text content</Select.Item>
    </div>
    <Select.Item
      value="content2"
      disabled
    >
      Content2
    </Select.Item>
    <Select.Item value="content3">Content3</Select.Item>
</Select>
`
    : ""
}`;
        },
      },
    },
  },
};
