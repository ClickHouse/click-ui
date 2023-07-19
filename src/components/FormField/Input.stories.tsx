import Input from "./Input";

export default {
  component: Input,
  title: "Input",
  tags: ["form-field", "select"],
  argTypes: {
    type: {
      control: "radio",
      options: ["number", "text", "password", "email", "tel", "url"],
    },
    value: { control: "string" },
    clear: { control: "boolean" },
    label: { control: "string" },
    error: { control: "string" },
    disabled: { control: "boolean" },
    placeholder: { control: "string" },
    form: { control: "string" },
    alt: { control: "string" },
    autoComplete: { control: "string" },
    autoFocus: { control: "boolean" },
    dir: { control: "string" },
    name: { control: "string" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    minLength: { control: "number", if: { type: "number", truthy: false } },
    maxLength: { control: "number", if: { type: "number", truthy: false } },
    pattern: { control: "string", if: { type: "number", truthy: false } },
    size: { control: "number", if: { type: "number", truthy: false } },
    min: { control: "string", if: { type: "number" } },
    max: { control: "string", if: { type: "number" } },
    step: { control: "string", if: { type: "number" } },
  },
};

const commonProps = {
  label: "Label",
  clear: false,
  type: "text",
  disabled: false,
  placeholder: "Placeholder",
};

export const Default = {
  args: commonProps,
};

export const Password = {
  args: {
    ...commonProps,
    clear: true,
    type: "password",
  },
};

export const Disabled = {
  args: {
    ...commonProps,
    disabled: true,
  },
};

export const Error = {
  args: {
    ...commonProps,
    error: "TestValue",
  },
};
