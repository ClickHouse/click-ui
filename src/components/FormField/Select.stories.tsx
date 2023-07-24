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
  title: "Forms/Select",
  tags: ["form-field", "select", "autodocs"],
};

export const Playground = {
  args: {
    label: "Label",
    children,
  },
};