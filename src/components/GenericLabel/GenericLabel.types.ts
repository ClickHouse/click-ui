import { HTMLAttributes } from 'react';

export interface GenericLabelProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  htmlFor?: string;
}
