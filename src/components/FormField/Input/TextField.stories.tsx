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
