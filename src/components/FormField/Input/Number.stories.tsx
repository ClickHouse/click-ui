import { useEffect, useState } from "react";
import { NumberField as NumberFieldInput } from "./NumberField";

const NumberField = ({ value: valueProp, ...props }: any) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <NumberFieldInput
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
      {...props}
    />
  );
};

export default {
  component: NumberField,
  title: "Forms/Input/NumberField",
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
    min: { control: "text", if: { type: "number" } },
    max: { control: "text", if: { type: "number" } },
    step: { control: "text", if: { type: "number" } },
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};