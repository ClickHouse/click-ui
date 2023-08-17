import { useEffect, useState } from "react";
import { PasswordField as PasswordFieldInput, PasswordInputProps } from "./PasswordField";

const PasswordField = ({
  value: valueProp,
  ...props
}: Omit<PasswordInputProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <PasswordFieldInput
      value={value}
      onChange={(inputValue: string) => {
        setValue(inputValue);
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
    readOnly: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};
