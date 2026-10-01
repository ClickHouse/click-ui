import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { HTMLAttributes, ReactNode } from 'react';

export interface RadioGroupProps extends Omit<RadixRadioGroup.RadioGroupProps, 'dir'> {
  /** Lays the items out in a row instead of a column. */
  inline?: boolean;
  /** Puts the label beside (`horizontal`) or above or below (`vertical`) the group. */
  orientation?: 'vertical' | 'horizontal';
  /** Puts the label before (`start`) or after (`end`) the group. */
  dir?: 'start' | 'end';
  /** Text direction of the items. */
  itemDir?: 'rtl' | 'ltr';
  label?: ReactNode;
  /** Error message shown below the group. */
  error?: ReactNode;
}

interface RadioGroupInputProps extends RadixRadioGroup.RadioGroupItemProps {
  label?: ReactNode;
}

export type RadioGroupItemProps = RadioGroupInputProps & HTMLAttributes<HTMLDivElement>;
