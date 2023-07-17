import Input from "./Input";

export default {
  component: Input,
  title: "Input",
  tags: ["form-field", "select"],
};

export const Default = {
  args: {
    label: "Input",
  },
};

export const Password = {
  args: {
    label: "Input",
    clear: true,
    type: "password",
  },
};

export const Disabled = {
  args: {
    label: "Input",
    disabled: true,
  },
};

export const Error = {
  args: {
    label: "Label",
    error: "TestValue",
  },
};
