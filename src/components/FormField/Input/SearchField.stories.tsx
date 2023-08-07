import { useEffect, useState } from "react";
import { SearchField as SearchFieldInput } from "./SearchField";

const SearchField = ({ value: valueProp, ...props }: any) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <SearchFieldInput
      value={value}
      onChange={(inputValue: string) => {
        setValue(inputValue);
      }}
      {...props}
    />
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
  },
};

export const Playground = {
  args: {
    label: "Label",
    disabled: false,
    placeholder: "Placeholder",
  },
};
