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
