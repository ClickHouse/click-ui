import { useCallback, useEffect, useState } from "react";
import { SelectGroup, SelectItem, SelectNoData } from "./common/SelectContenOptions";
import { SelectContent } from "./common/SelectContent";
import SelectTrigger from "./common/SelectTrigger";
import { SelectContainerProps } from "./common/types";
import SelectContainer from "./common/SelectContainer";

interface Props {
  defaultValue?: string;
  onChange?: (value: string) => void;
  value?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type SelectProps = Omit<
  SelectContainerProps,
  "onChange" | "value" | "sortable" | "open" | "onOpenChange" | "onSelect"
> &
  Props;

export const Select = ({
  children,
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  open: openProp,
  defaultOpen,
  onOpenChange: onOpenChangeProp,
  ...props
}: SelectProps) => {
  const [selectedValues, setSelectedValues] = useState<Array<string>>(
    valueProp ? [valueProp] : defaultValue ? [defaultValue] : []
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
    setOpen(openProp ?? false);
  }, [openProp]);

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
    <SelectContainer
      onChange={onChange}
      value={selectedValues}
      open={openProp ?? open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      {...props}
    >
      {children}
    </SelectContainer>
  );
};

SelectTrigger.displayName = "Select.Trigger";
Select.Trigger = SelectTrigger;

SelectContent.displayName = "MultiSelect.Content";
Select.Content = SelectContent;

Select.Group = SelectGroup;
Select.Item = SelectItem;
Select.NoData = SelectNoData;
