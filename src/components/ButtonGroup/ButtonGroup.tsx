"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import styles from "@/components/ButtonGroup/ButtonGroup.module.scss";

type ButtonGroupType = "default" | "borderless";

export interface ButtonGroupElementProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** The unique value for this button */
  value: string;
  /** The label text to display */
  label?: ReactNode;
}

export interface ButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onClick"
> {
  /** Array of button options to display */
  options: Array<ButtonGroupElementProps>;
  /** The currently selected button value */
  selected?: string;
  /** Callback when a button is clicked */
  onClick?: (value: string) => void;
  /** Whether the button group should fill the full width */
  fillWidth?: boolean;
  /** The style type of the button group */
  type?: ButtonGroupType;
}

export const ButtonGroup = ({
  options,
  selected,
  fillWidth = false,
  onClick,
  type = "default",
  className,
  ...props
}: ButtonGroupProps) => {
  const typeClass = `cuiType${capitalize(type)}`;

  const buttons = options.map(({ value, label, ...buttonProps }) => (
    <button
      key={value}
      className={clsx(styles.cuiButton, styles[typeClass], {
        [styles.cuiActive]: value === selected,
        [styles.cuiInactive]: value !== selected,
        [styles.cuiFillWidth]: fillWidth,
      })}
      data-cui-type={type}
      onClick={() => onClick?.(value)}
      role="button"
      aria-pressed={value === selected}
      {...buttonProps}
    >
      {label}
    </button>
  ));

  return (
    <div
      className={clsx(
        styles.cuiButtonGroupWrapper,
        styles[typeClass],
        {
          [styles.cuiFillWidth]: fillWidth,
        },
        className
      )}
      data-cui-type={type}
      {...props}
    >
      {buttons}
    </div>
  );
};
