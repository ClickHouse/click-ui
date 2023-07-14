import Select from "./Select";

const children = (
  <>
    <Select.Group label='Group label'>
      <Select.Item value='content0'>Content0</Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Item value='content1'>Content1 long text content</Select.Item>
    <Select.Separator />
    <Select.Item value='content2'>Content2</Select.Item>
    <Select.Item value='content3'>Content3</Select.Item>
  </>
);

export default {
  component: Select,
  title: "Select",
  tags: ["form-field", "select"],
};

export const Default = {
  args: {
    label: "Label",
    children,
  },
};

export const Disabled = {
  args: {
    label: "Label",
    disabled: true,
    children,
  },
};

export const Error = {
  args: {
    label: "Label",
    error: "TestValue",
    children,
  },
};
