import Select from ".";

const children = (
  <>
    <Select.Item value='content1'>Content1</Select.Item>
    <Select.Item value='content2'>Content2</Select.Item>
  </>
);

export default {
  component: Select,
  title: "Select",
  tags: ["form-field", "select"],
};

export const Default = {
  args: {
    label: "Accordion title",
    children,
  },
};

export const Disabled = {
  args: {
    label: "Accordion title",
    disabled: true,
    children,
  },
};

export const Error = {
  args: {
    label: "Accordion title",
    error: "TestValue",
    children,
  },
};
