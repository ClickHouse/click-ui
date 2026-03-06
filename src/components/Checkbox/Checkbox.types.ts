import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ReactNode } from 'react';

export type CheckboxVariants =
  | 'default'
  | 'var1'
  | 'var2'
  | 'var3'
  | 'var4'
  | 'var5'
  | 'var6';

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  variant?: CheckboxVariants;
  dir?: 'start' | 'end';
}
