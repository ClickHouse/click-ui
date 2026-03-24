import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';

export interface RadioGroupProps extends Omit<RadixRadioGroup.RadioGroupProps, 'dir'> {
  inline?: boolean;
  orientation?: 'vertical' | 'horizontal';
  dir?: 'start' | 'end';
  itemDir?: 'rtl' | 'ltr';
  label?: ReactNode;
  error?: ReactNode;
}

export interface RadioGroupItemProps extends RadixRadioGroup.RadioGroupItemProps {
  label?: ReactNode;
}
