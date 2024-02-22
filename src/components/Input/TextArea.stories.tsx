import { ChangeEvent, useEffect, useState } from "react";
import { TextAreaField as TextAreaFieldInput, TextAreaFieldProps } from "./TextArea";
import { Container } from "../Container/Container";

const TextAreaField = ({
  value: valueProp,
  ...props
}: Omit<TextAreaFieldProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <Container maxWidth="75%">
      <TextAreaFieldInput
        value={value}
        onChange={(inputValue: string, e?: ChangeEvent<HTMLTextAreaElement>) => {
          if (e) {
            e.preventDefault();
          }
          setValue(inputValue);
        }}
        {...props}
      />
    </Container>
  );
};

export default {
  component: TextAreaField,
  title: "Forms/Input/TextArea",
  tags: ["form-field", "input", "autodocs"],
  argTypes: {
    rows: {
      control: "number",
      default: 10,
    },
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
    rows: 5,
    disabled: false,
    placeholder: "Placeholder",
  },
};
