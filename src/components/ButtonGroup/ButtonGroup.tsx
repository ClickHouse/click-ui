"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "@/components/ButtonGroup/ButtonGroup.module.scss";

type ButtonGroupType = "default" | "borderless";

export interface ButtonGroupElementProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  value: string;
  label?: ReactNode;
}

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  options: Array<ButtonGroupElementProps>;
  selected?: string;
  onClick?: (value: string) => void;
  fillWidth?: boolean;
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
  const buttons = options.map(({ value, label, ...buttonProps }) => (
    <button
      key={value}
      className={clsx(styles.cuiButton, {
        [styles.cuiActive]: value === selected,
        [styles.cuiInactive]: value !== selected,
        [styles.cuiFillWidth]: fillWidth,
        [styles.cuiTypeDefault]: type === "default",
        [styles.cuiTypeBorderless]: type === "borderless",
      })}
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
        {
          [styles.cuiFillWidth]: fillWidth,
          [styles.cuiFillWidthFalse]: !fillWidth,
          [styles.cuiTypeDefault]: type === "default",
          [styles.cuiTypeBorderless]: type === "borderless",
        },
        className
      )}
      {...props}
    >
      {buttons}
    </div>
  );
};
