"use client";

import { Icon, IconName } from "@/components";
import clsx from "clsx";
import { capitalize } from "../../utils/capitalize";
import styles from "./Button.module.scss";
import React from "react";

export type ButtonType = "primary" | "secondary" | "empty" | "danger";
type Alignment = "center" | "left";

export interface ButtonProps extends Omit<React.ComponentPropsWithoutRef<"button">, "type"> {
  /** The visual style variant of the button */
  type?: ButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The text label to display in the button */
  label?: string;
  /** Icon to display on the left side of the label */
  iconLeft?: IconName;
  /** Icon to display on the right side of the label */
  iconRight?: IconName;
  /** Alignment of the button content */
  align?: Alignment;
  /** Whether the button should fill the full width of its container */
  fillWidth?: boolean;
  /** Whether to show a loading state */
  loading?: boolean;
  /** Whether the button should be focused on mount */
  autoFocus?: boolean;
}

export const Button = ({
  type = "primary",
  iconLeft,
  iconRight,
  align = "center",
  children,
  fillWidth,
  label,
  loading = false,
  disabled,
  className,
  ...delegated
}: ButtonProps) => {
  const typeClass = `cui${capitalize(type)}`;
  const alignClass = `cuiAlign${capitalize(align)}`;

  return (
    <button
      className={clsx(
        styles.cuiButton,
        styles[typeClass],
        styles[alignClass],
        {
          [styles.cuiFillWidth]: fillWidth,
          [styles.cuiLoading]: loading,
        },
        className
      )}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      role="button"
      data-fill-width={fillWidth}
      {...delegated}
    >
      {iconLeft && (
        <Icon
          name={iconLeft}
          aria-hidden
          size="sm"
          className={styles.cuiButtonIcon}
        />
      )}

      <span>{label ?? children}</span>

      {iconRight && (
        <Icon
          name={iconRight}
          aria-hidden
          size="sm"
          className={styles.cuiButtonIcon}
        />
      )}
    </button>
  );
};
