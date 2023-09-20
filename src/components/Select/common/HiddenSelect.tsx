import { SelectItemObject } from "../types";

const HiddenSelect = ({
  options,
  name,
  form,
  selectedValues,
}: {
  options: Array<SelectItemObject>;
  name?: string;
  form?: string;
  selectedValues: Array<string>;
}) => {
  return (
    <select
      name={name}
      form={form}
    >
      {options.map(item => (
        <option
          value={item.value}
          selected={selectedValues.includes(item.value)}
          disabled={item.disabled}
        >
          {item.value}
        </option>
      ))}
    </select>
  );
};

export default HiddenSelect;
