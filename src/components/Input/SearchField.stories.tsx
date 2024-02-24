import { useEffect, useState } from "react";
import { SearchField as SearchFieldInput, SearchFieldProps } from "./SearchField";
import { Container } from "../Container/Container";

const SearchField = ({
  value: valueProp,
  ...props
}: Omit<SearchFieldProps, "onChange">) => {
  const [value, setValue] = useState(valueProp);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <Container maxWidth="75%">
      <SearchFieldInput
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
  component: SearchField,
  title: "Forms/Input/SearchField",
  tags: ["form-field", "input", "autodocs"],
  argTypes: {
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
    disabled: false,
    placeholder: "Placeholder",
  },
};
