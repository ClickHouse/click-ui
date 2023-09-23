import { Icon } from "@/components";
import { Select, SelectProps } from "./SingleSelect";
import { Preview } from "@storybook/react";
interface Props extends SelectProps {
  clickableNoData?: boolean;
}
const SelectExample = ({ clickableNoData, value, ...props }: Props) => {
  return (
    <Select
      value={value}
      onCreateOption={
        clickableNoData ? search => console.log("Clicked ", search) : undefined
      }
      {...props}
    >
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
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    name: { control: "text" },
    required: { control: "boolean" },
    showSearch: { control: "boolean" },
    form: { control: "text" },
    clickableNoData: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground: Preview = {
  args: {
    label: "Label",
  },
  parameters: {
    docs: {
      source: {
        transform: (_: string, story: { args: Props; [x: string]: unknown }) => {
          const { clickableNoData, showSearch, value, ...props } = story.args;
          return `<Select\n  value={${value}}\n${
            clickableNoData
              ? "  onCreateOption={search => console.log('Clicked ', search)}\n"
              : ""
          }${Object.entries(props)
            .map(
              ([key, value]) =>
                `  ${key}=${typeof value == "string" ? `"${value}"` : `{${value}}`}`
            )
            .join("\n")}
>
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
</Select>`;
        },
      },
    },
  },
};
