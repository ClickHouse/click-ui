import { useCallback, useEffect, useState } from "react";
import { SelectContainerProps, SelectOptionProp } from "./common/types";
import { InternalSelect, SelectGroup, SelectItem } from "./common/InternalSelect";

export interface SelectProps
  extends Omit<
    SelectContainerProps,
    "onChange" | "value" | "sortable" | "open" | "onOpenChange" | "onSelect"
  > {
  defaultValue?: string;
  onSelect?: (value: string) => void;
  value?: string;
  placeholder?: string;
}

export const Select = ({
  value: valueProp,
  defaultValue,
  onSelect: onSelectProp,
  options,
  children,
  ...props
}: SelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    valueProp ? [valueProp] : defaultValue ? [defaultValue] : []
  );
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const onSelect = useCallback(
    (value: string) => {
      setSelectedValues(values => {
        if (values[0] !== value) {
          return [value];
        }
        return values;
      });
      onOpenChange(false);
      if (typeof onSelectProp === "function") {
        onSelectProp(value);
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

  useEffect(() => {
    setSelectedValues(valueProp ? [valueProp] : []);
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
      value={valueProp ? [valueProp] : selectedValues}
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
