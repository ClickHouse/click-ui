import { useEffect, useState } from "react";
import { NumberField as NumberFieldInput, NumberFieldProps } from "./NumberField";
import { Container } from "@/components/Container/Container";

const NumberField = ({
  value: valueProp,
  ...props
}: Omit<NumberFieldProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <Container maxWidth="300px">
      <NumberFieldInput
        value={value}
        onChange={(inputValue: string) => {
          setValue(inputValue);
        }}
        {...props}
      />
    </Container>
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
    readOnly: { control: "boolean" },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    dir: { control: "inline-radio", options: ["start", "end"] },
    hideControls: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};
