import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type ButtonGroupType = 'default' | 'borderless';
export type SelectionValue = string | Set<string>;

export interface ButtonGroupElementProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
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
  /**
   * Accessible label for the button group.
   * Strongly recommended for WCAG 4.1.2 compliance - role="group" should have an accessible name.
   * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value
   */
  'aria-label'?: string;
}
