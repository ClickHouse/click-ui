import * as RadixSwitch from '@radix-ui/react-switch';
import { ReactNode } from 'react';

export interface SwitchProps extends Omit<RadixSwitch.SwitchProps, 'dir'> {
  checked: boolean;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  dir?: 'start' | 'end';
  label?: ReactNode;
}
