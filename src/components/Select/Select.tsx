import { KeyboardEvent, MouseEvent, useCallback, useState } from 'react';

import { useUpdateEffect } from '@/hooks/internal';

import type { SelectProps, SelectOptionProp, SelectionType } from './Select.types';
import {
  InternalSelect,
  SelectGroup,
  SelectItem,
  SelectItemDescription,
} from './common/InternalSelect';

export const Select = ({
  value: valueProp,
  defaultValue,
  onSelect: onSelectProp,
  options,
  children,
  onOpenChange: onOpenChangeProp,
  ...props
}: SelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    typeof valueProp === 'string'
      ? [valueProp]
      : typeof defaultValue === 'string'
        ? [defaultValue]
        : []
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

  const onSelect = useCallback(
    (
      value: string,
      type?: SelectionType,
      evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
    ) => {
      setSelectedValues(values => {
        if (values[0] !== value) {
          return [value];
        }
        return values;
      });
      onOpenChange(false);
      if (typeof onSelectProp === 'function') {
        onSelectProp(value, type, evt);
      }
    },
    [onSelectProp, onOpenChange]
  );

  const onChange = useCallback(
    (values: string[]) => {
      if (values[0] !== selectedValues[0]) {
        onSelect(values[0]);
      }
    },
    [selectedValues, onSelect]
  );

  useUpdateEffect(() => {
    setSelectedValues(typeof valueProp === 'string' ? [valueProp] : []);
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
      value={typeof valueProp === 'string' ? [valueProp] : selectedValues}
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
Select.ItemDescription = SelectItemDescription;
