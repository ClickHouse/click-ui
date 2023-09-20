import styled from "styled-components";
import { SelectItemObject } from "../types";

const HiddenSelectElement = styled.select`
  visibility: hidden;
  position: absolute;
  z-index: -1;
  height: 0;
`;
const HiddenSelect = ({
  options,
  name,
  form,
  selectedValues,
  multiple,
}: {
  options: Array<SelectItemObject>;
  name?: string;
  form?: string;
  selectedValues: Array<string>;
  multiple: boolean;
}) => {
  return (
    <HiddenSelectElement
      multiple={multiple}
      name={name}
      form={form}
      value={selectedValues}
      onChange={() => null}
    >
      {options.map(item => (
        <option
          key={item.value}
          value={item.value}
          disabled={item.disabled}
        >
          {item.value}
        </option>
      ))}
    </HiddenSelectElement>
  );
};

export default HiddenSelect;
