import { ChangeEvent, useEffect, useState } from "react";
import { TextField as TextFieldInput, TextFieldProps } from "./TextField";

const TextField = ({ value: valueProp, ...props }: Omit<TextFieldProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <TextFieldInput
      value={value}
      onChange={(inputValue: string, e?: ChangeEvent<HTMLInputElement>) => {
        if (e) {
          e.preventDefault();
        }
        setValue(inputValue);
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
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
  },
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
