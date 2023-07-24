import Select from "./Select";

const children = (
  <>
    <Select.Group label="Group label">
      <Select.Item value="content0">Content0</Select.Item>
    </Select.Group>
    <Select.Item value="content1">Content1 long text content</Select.Item>
    <Select.Item value="content2">Content2</Select.Item>
    <Select.Item value="content3">Content3</Select.Item>
  </>
);

export default {
  component: Select,
  title: "Forms/Select",
  tags: ["form-field", "select", "autodocs"],
  argTypes: {
    label: { control: "string" },
    disabled: { control: "boolean" },
    error: { control: "string" },
    value: { control: "string" },
    defaultValue: { control: "string" },
    open: { control: "inline-radio", options: [undefined, true, false] },
    defaultOpen: { control: "boolean" },
    dir: { control: "inline-radio", options: ["ltr", "rtl"] },
    name: { control: "string" },
    autoComplete: { control: "string" },
    required: { control: "boolean" },
    search: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    label: "Label",
    children,
  },
};
