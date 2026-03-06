import { HTMLAttributes, ReactNode } from 'react';

export type ButtonGroupType = 'default' | 'borderless';
export type SelectionValue = string | Set<string>;

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
  selected?: SelectionValue;
  defaultSelected?: SelectionValue;
  onClick?: (value: string, selected: SelectionValue) => void;
  fillWidth?: boolean;
  type?: ButtonGroupType;
  multiple?: boolean;
}
