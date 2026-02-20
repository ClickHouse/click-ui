import { HTMLAttributes, ReactNode } from 'react';

export type ButtonGroupType = 'default' | 'borderless';

export interface ButtonGroupElementProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'children'
> {
  value: string;
  label?: ReactNode;
}

export interface ButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClick'
> {
  options: Array<ButtonGroupElementProps>;
  selected?: string;
  onClick?: (value: string) => void;
  fillWidth?: boolean;
  type?: ButtonGroupType;
}
