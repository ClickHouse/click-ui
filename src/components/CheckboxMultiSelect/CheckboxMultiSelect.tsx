import { useCallback, useState } from 'react';
import { useUpdateEffect } from '@/hooks';
import {
  SelectGroup,
  InternalSelect,
  MultiSelectCheckboxItem,
  SelectItemDescription,
} from '@/components/Select/common/InternalSelect';

import type { SelectOptionProp, SelectionType } from '@/components/Select/common/types';
import type { CheckboxMultiSelectProps } from './CheckboxMultiSelect.types';

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
  const [selectedValues, setSelectedValues] = useState<string[]>(
    valueProp ?? defaultValue ?? []
  );
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      if (typeof onOpenChangeProp === 'function') {
        onOpenChangeProp(open);
      }
    },
    [onOpenChangeProp]
  );

  useUpdateEffect(() => {
    setSelectedValues(valueProp ?? []);
  }, [valueProp]);

  const onChange = useCallback(
    (values: string[], type?: SelectionType) => {
      setSelectedValues(values);
      if (typeof onSelectProp === 'function') {
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
CheckboxMultiSelect.ItemDescription = SelectItemDescription;
