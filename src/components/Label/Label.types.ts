import { HTMLAttributes } from 'react';

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  error?: boolean;
  htmlFor?: string;
}
