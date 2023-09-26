import { useCallback, useEffect, useState } from "react";

import { SelectContainerProps, SelectOptionProp } from "./common/types";
import { SelectGroup, SelectItem, InternalSelect } from "./common/InternalSelect";

export interface MultiSelectProps
  extends Omit<
    SelectContainerProps,
    "onChange" | "value" | "open" | "onOpenChange" | "onSelect"
  > {
  defaultValue?: Array<string>;
  onSelect?: (value: Array<string>) => void;
  value?: Array<string>;
  defaultOpen?: boolean;
}

export const MultiSelect = ({
  value: valueProp,
  defaultValue,
  onSelect: onSelectProp,
  options,
  children,
  ...props
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    valueProp ?? defaultValue ?? []
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedValues(valueProp ?? []);
  }, [valueProp]);

  const onChange = useCallback(
    (values: Array<string>) => {
      setSelectedValues(values);
      if (typeof onSelectProp === "function") {
        onSelectProp(values);
      }
    },
    [onSelectProp]
  );

  const onSelect = useCallback(
    (value: string) => {
      let newValues = [];
      if (selectedValues.includes(value)) {
        newValues = selectedValues.filter(currentValue => currentValue !== value);
      } else {
        newValues = [...selectedValues, value];
      }

      onChange(newValues);
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
      value={valueProp ?? selectedValues}
      open={open}
      onOpenChange={setOpen}
      onSelect={onSelect}
      multiple
      {...conditionalProps}
      {...props}
    />
  );
};

MultiSelect.Group = SelectGroup;
MultiSelect.Item = SelectItem;
