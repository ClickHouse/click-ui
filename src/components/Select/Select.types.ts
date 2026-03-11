// TODO: Can we get rid of common now? revise

import type { KeyboardEvent, MouseEvent } from 'react';
import type { SelectContainerProps, SelectionType } from './common/types';

export type {
  SelectOptionProp,
  SelectContainerProps,
  SelectionType,
} from './common/types';

export interface SelectProps extends Omit<
  SelectContainerProps,
  'onChange' | 'value' | 'sortable' | 'open' | 'onOpenChange' | 'onSelect'
> {
  defaultValue?: string;
  onSelect?: (
    value: string,
    type?: SelectionType,
    evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  value?: string;
  placeholder?: string;
  onOpenChange?: (open: boolean) => void;
  useFullWidthItems?: boolean;
  itemCharacterLimit?: string;
}

export type { SelectGroupOptionItem, SelectOptionListItem } from './common/types';
