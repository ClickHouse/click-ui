import { useEffect, useState } from "react";
import { PasswordField as PasswordFieldInput } from "./PasswordField";

const PasswordField = ({ value: valueProp, ...props }: any) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <PasswordFieldInput
      value={value}
      onChange={(e: any) => {
        e.preventDefault();
        setValue(e.target.value);
      }}
      {...props}
    />
  );
};

export default {
  component: PasswordField,
  title: "Forms/Input/PasswordField",
  tags: ["form-field", "input", "autodocs"],
  argTypes: {
    value: { control: "text" },
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
    minLength: { control: "number", if: { type: "number", truthy: false } },
    maxLength: { control: "number", if: { type: "number", truthy: false } },
    pattern: { control: "text", if: { type: "number", truthy: false } },
    size: { control: "number", if: { type: "number", truthy: false } },
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};
