import { KeyboardEvent, MouseEvent, useCallback, useState } from 'react';

import { useUpdateEffect } from '@/hooks';

import type {
  SelectOptionListItem,
  SelectProps,
  SelectOptionProp,
  SelectionType,
} from './Select.types';
import {
  InternalSelect,
  SelectGroup,
  SelectItem,
  SelectItemDescription,
} from '@/components/Select';

export const selectOptions: SelectOptionListItem[] = [
  {
    heading: 'Group label',
    options: [
      {
        icon: 'user',
        iconDir: 'start',
        value: 'content0',
        label: 'Content0',
      },
    ],
  },
  {
    value: 'content1',
    label: 'Content1 long text content',
  },
  {
    value: 'content2',
    label: 'Content2',
    description: 'Description of a disabled item',
    disabled: true,
  },
  {
    value: 'content3',
    label: 'Content3',
    description: 'Description of Content3',
  },
  {
    value: 'content4',
    label: 'Content4',
  },
];

export const selectOptionsLong: SelectOptionListItem[] = [
  {
    value: '1',
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    value: '2',
    label:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    value: '3',
    label:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    value: '4',
    label:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

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
