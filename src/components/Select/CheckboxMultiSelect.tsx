import { useCallback, useEffect, useState } from "react";

import { SelectOptionProp, SelectionType } from "./common/types";
import {
  SelectGroup,
  InternalSelect,
  MultiSelectCheckboxItem,
} from "./common/InternalSelect";

import { MultiSelectProps } from "..";

export interface CheckboxMultiSelectProps extends MultiSelectProps {
  selectLabel?: string;
}

export const CheckboxMultiSelect = ({
  value: valueProp,
  defaultValue,
  onSelect: onSelectProp,
  options,
  children,
  onOpenChange: onOpenChangeProp,
  selectLabel,
  ...props
}: CheckboxMultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    valueProp ?? defaultValue ?? []
  );
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      if (typeof onOpenChangeProp === "function") {
        onOpenChangeProp(open);
      }
    },
    [onOpenChangeProp]
  );

  useEffect(() => {
    setSelectedValues(valueProp ?? []);
  }, [valueProp]);

  const onChange = useCallback(
    (values: Array<string>, type?: SelectionType) => {
      setSelectedValues(values);
      if (typeof onSelectProp === "function") {
        onSelectProp(values, type);
      }
    },
    [onSelectProp]
  );

  const onSelect = useCallback(
    (value: string, type?: SelectionType) => {
      let newValues = [];
      if (selectedValues.includes(value)) {
        newValues = selectedValues.filter(currentValue => currentValue !== value);
      } else {
        newValues = [...selectedValues, value];
      }

      onChange(newValues, type);
    },
    [onChange, selectedValues]
  );

  const conditionalProps: Partial<SelectOptionProp> = {};
  if (options) {
    conditionalProps.options = options;
  } else {
    conditionalProps.children = children;
  }

  return (
    <InternalSelect
      onChange={onChange}
      value={selectedValues}
      open={open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      checkbox={true}
      selectLabel={selectLabel}
      {...conditionalProps}
      {...props}
    />
  );
};

CheckboxMultiSelect.Group = SelectGroup;
CheckboxMultiSelect.Item = MultiSelectCheckboxItem;
