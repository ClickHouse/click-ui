import { useEffect, useState } from "react";
import { PasswordField as PasswordFieldInput, PasswordFieldProps } from "./PasswordField";

const PasswordField = ({
  value: valueProp,
  ...props
}: Omit<PasswordFieldProps, "onChange">) => {
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
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};
