import { useCallback, useEffect, useState } from "react";
import { SelectContainerProps } from "./common/types";
import { InternalSelect, SelectGroup, SelectItem } from "./common/InternalSelect";

interface SelectProps
  extends Omit<
    SelectContainerProps,
    "onChange" | "value" | "sortable" | "open" | "onOpenChange" | "onSelect"
  > {
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
}

export const Select = ({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  options,
  children,
  ...props
}: SelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    valueProp ? [valueProp] : defaultValue ? [defaultValue] : []
  );
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((newOpen?: boolean) => {
    setOpen(open => newOpen ?? !open);
  }, []);

  const onChange = useCallback(
    (values: Array<string>) => {
      if (values[0] !== selectedValues[0]) {
        setSelectedValues(values);
        if (typeof onChangeProp === "function") {
          onChangeProp(values[0]);
        }
        onOpenChange(false);
      }
    },
    [onChangeProp, onOpenChange, selectedValues]
  );

  useEffect(() => {
    setSelectedValues(valueProp ? [valueProp] : []);
  }, [valueProp]);

  const onSelect = useCallback(
    (value: string) => {
      setSelectedValues(values => {
        if (values[0] !== value) {
          return [value];
        }
        return values;
      });
      onOpenChange(false);
      if (typeof onChangeProp === "function") {
        onChangeProp(value);
      }
    },
    [onChangeProp, onOpenChange]
  );

  return (
    <InternalSelect
      onChange={onChange}
      value={valueProp ? [valueProp] : selectedValues}
      open={open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      options={options}
      children={children}
      {...props}
    />
  );
};

Select.Group = SelectGroup;
Select.Item = SelectItem;
