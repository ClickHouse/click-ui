import { useCallback, useEffect, useState } from "react";

import { SelectContainerProps, SelectOptionProp } from "./common/types";
import { SelectGroup, SelectItem, InternalSelect } from "./common/InternalSelect";

export interface MultiSelectProps
  extends Omit<
    SelectContainerProps,
    "onChange" | "value" | "open" | "onOpenChange" | "onSelect"
  > {
  defaultValue?: Array<string>;
  onChange?: (value: Array<string>) => void;
  value?: Array<string>;
  defaultOpen?: boolean;
}

export const MultiSelect = ({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
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
      if (typeof onChangeProp === "function") {
        onChangeProp(values);
      }
    },
    [onChangeProp]
  );

  const onSelect = useCallback(
    (value: string) => {
      setSelectedValues(values => {
        let newValues = [];
        if (values.includes(value)) {
          newValues = values.filter(currentValue => currentValue !== value);
        } else {
          newValues = [...values, value];
        }

        onChange(newValues);
        return newValues;
      });
    },
    [onChange]
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
