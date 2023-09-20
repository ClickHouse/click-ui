import { forwardRef, useCallback, useEffect, useState } from "react";

import SelectContainer from "./common/SelectContainer";
import { SelectContainerProps } from "./types";
import SelectTrigger from "./common/SelectTrigger";
import { SelectContent, SelectContentProps } from "./common/SelectContent";
import { SelectGroup, SelectItem, SelectNoData } from "./common/SelectContenOptions";

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
  children,
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
    <SelectContainer
      onChange={onChange}
      value={selectedValues}
      open={open}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      {...props}
    >
      {children}
    </SelectContainer>
  );
};

SelectTrigger.displayName = "MultiSelect.Trigger";
MultiSelect.Trigger = SelectTrigger;

const MultiSelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (props, ref) => {
    return (
      <SelectContent
        ref={ref}
        {...props}
        type="MultiSelect"
      />
    );
  }
);

MultiSelectContent.displayName = "MultiSelect.Content";
MultiSelect.Content = MultiSelectContent;

MultiSelect.Group = SelectGroup;
MultiSelect.Item = SelectItem;
MultiSelect.NoData = SelectNoData;
