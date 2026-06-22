import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { IconName } from '@/components/Icon';

export type ButtonGroupType = 'default' | 'borderless' | 'iconOnly';
export type SelectionValue = string | Set<string>;

/** Props for each button in the group. For `iconOnly`, set `aria-label` on each option. */
export interface ButtonGroupElementProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  value: string;
  label?: ReactNode;
  icon?: IconName;
}

/** For `type="iconOnly"`, provide `aria-label` on the group and each option. */
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
