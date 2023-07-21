import { Input } from "./Input";
import { PasswordInput } from "./PasswordInput";
import { PasswordInputProps } from "./types";

export default {
  component: Input,
  title: "Input",
  tags: ["form-field", "input"],
  argTypes: {
    type: {
      control: "radio",
      options: ["number", "text", "email", "tel", "url"],
    },
    value: { control: "text" },
    clear: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    form: { control: "text" },
    alt: { control: "text" },
    autoComplete: { control: "text" },
    autoFocus: { control: "boolean" },
    dir: { control: "text" },
    name: { control: "text" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    loading: { control: "boolean" },
    minLength: { control: "number", if: { type: "number", truthy: false } },
    maxLength: { control: "number", if: { type: "number", truthy: false } },
    pattern: { control: "text", if: { type: "number", truthy: false } },
    size: { control: "number", if: { type: "number", truthy: false } },
    min: { control: "text", if: { type: "number" } },
    max: { control: "text", if: { type: "number" } },
    step: { control: "text", if: { type: "number" } },
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
  render: (props: PasswordInputProps) => <PasswordInput {...props} />,
  argTypes: {
    type: { control: "radio", options: ["password"] },
  },
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
