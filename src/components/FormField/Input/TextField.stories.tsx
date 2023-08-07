import { useEffect, useState } from "react";
import { TextField as TextFieldInput } from "./TextField";

const TextField = ({ value: valueProp, ...props }: any) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <TextFieldInput
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
  component: TextField,
  title: "Forms/Input/TextField",
  tags: ["form-field", "input", "autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["text", "email", "tel", "url"],
    },
    value: { control: "text" },
    clear: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    readOnly: { control: "boolean" },
  },
};

const commonProps = {
  label: "Label",
  clear: false,
  type: "text",
  disabled: false,
  placeholder: "Placeholder",
};

export const Playground = {
  args: {
    label: "Label",
    clear: false,
    type: "text",
    disabled: false,
    placeholder: "Placeholder",
  },
};
