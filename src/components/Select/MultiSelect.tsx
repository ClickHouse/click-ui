import { useCallback, useEffect, useState } from "react";

import { SelectContainerProps } from "./common/types";
import { SelectGroup, SelectItem, InternalSelect } from "./common/InternalSelect";

interface Props {
  defaultValue?: Array<string>;
  onChange?: (value: Array<string>) => void;
  value?: Array<string>;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type MultiSelectProps = Omit<
  SelectContainerProps,
  "onChange" | "value" | "open" | "onOpenChange" | "onSelect"
> &
  Props;

export const MultiSelect = ({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  ...props
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    valueProp ?? defaultValue ?? []
  );
  const [open, setOpen] = useState(openProp ?? defaultOpen ?? false);
  const onOpenChange = useCallback(
    (newOpen?: boolean) => {
      setOpen(newOpen ?? !open);
      if (typeof onOpenChangeProp === "function") {
        onOpenChangeProp(newOpen ?? !open);
      }
    },
    [onOpenChangeProp, open]
  );

  useEffect(() => {
    setOpen(openProp ?? false);
  }, [openProp]);

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

  return (
    <InternalSelect
      onChange={onChange}
      value={valueProp ?? selectedValues}
      open={openProp ?? open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      {...props}
    />
  );
};

MultiSelect.Group = SelectGroup;
MultiSelect.Item = SelectItem;
