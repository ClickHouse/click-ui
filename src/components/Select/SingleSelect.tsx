import { useCallback, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import { SelectContainerProps, SelectOptionProp, SelectionType } from "./common/types";
import { InternalSelect, SelectGroup, SelectItem } from "./common/InternalSelect";

export interface SelectProps
  extends Omit<
    SelectContainerProps,
    "onChange" | "value" | "sortable" | "open" | "onOpenChange" | "onSelect"
  > {
  defaultValue?: string;
  onSelect?: (value: string, type?: SelectionType) => void;
  value?: string;
  placeholder?: string;
  onOpenChange?: (open: boolean) => void;
  useFullWidthItems?: boolean;
  itemCharacterLimit?: string;
}

export const Select = ({
  value: valueProp,
  defaultValue,
  onSelect: onSelectProp,
  options,
  children,
  onOpenChange: onOpenChangeProp,
  ...props
}: SelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    typeof valueProp === "string"
      ? [valueProp]
      : typeof defaultValue === "string"
      ? [defaultValue]
      : []
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

  const onSelect = useCallback(
    (value: string, type?: SelectionType) => {
      setSelectedValues(values => {
        if (values[0] !== value) {
          return [value];
        }
        return values;
      });
      onOpenChange(false);
      if (typeof onSelectProp === "function") {
        onSelectProp(value, type);
      }
    },
    [onSelectProp, onOpenChange]
  );

  const onChange = useCallback(
    (values: Array<string>) => {
      if (values[0] !== selectedValues[0]) {
        onSelect(values[0]);
      }
    },
    [selectedValues, onSelect]
  );

  useUpdateEffect(() => {
    setSelectedValues(typeof valueProp === "string" ? [valueProp] : []);
  }, [valueProp]);

  const conditionalProps: Partial<SelectOptionProp> = {};
  if (options) {
    conditionalProps.options = options;
  } else {
    conditionalProps.children = children;
  }

  return (
    <InternalSelect
      onChange={onChange}
      value={typeof valueProp === "string" ? [valueProp] : selectedValues}
      open={open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      {...conditionalProps}
      {...props}
    />
  );
};

Select.Group = SelectGroup;
Select.Item = SelectItem;
