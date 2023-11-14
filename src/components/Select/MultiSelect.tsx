import { useCallback, useEffect, useState } from "react";

import { SelectContainerProps, SelectOptionProp, SelectionType } from "./common/types";
import { SelectGroup, SelectItem, InternalSelect } from "./common/InternalSelect";

export interface MultiSelectProps
  extends Omit<
    SelectContainerProps,
    "onChange" | "value" | "open" | "onOpenChange" | "onSelect"
  > {
  defaultValue?: Array<string>;
  onSelect?: (value: Array<string>, type?: SelectionType) => void;
  value?: Array<string>;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const MultiSelect = ({
  value: valueProp,
  defaultValue,
  onSelect: onSelectProp,
  options,
  children,
  onOpenChange: onOpenChangeProp,
  ...props
}: MultiSelectProps) => {
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
      value={valueProp ?? selectedValues}
      open={open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      multiple
      {...conditionalProps}
      {...props}
    />
  );
};

MultiSelect.Group = SelectGroup;
MultiSelect.Item = SelectItem;
