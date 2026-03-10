import type { KeyboardEvent, MouseEvent } from 'react';
import type { SelectContainerProps, SelectionType } from '@/components/Select';

export interface MultiSelectProps extends Omit<
  SelectContainerProps,
  'onChange' | 'value' | 'open' | 'onOpenChange' | 'onSelect'
> {
  defaultValue?: string[];
  onSelect?: (
    value: string[],
    type?: SelectionType,
    evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  value?: string[];
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
