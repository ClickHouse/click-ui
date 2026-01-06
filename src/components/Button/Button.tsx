"use client";

import { Icon, IconName } from "@/components";
import clsx from "clsx";
import { capitalize } from "../../utils/capitalize";
import styles from "./Button.module.scss";
import React from "react";

export type ButtonType = "primary" | "secondary" | "empty" | "danger";
type Alignment = "center" | "left";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
  /** Whether to show the label text alongside the loading icon */
  showLabelWithLoading?: boolean;
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
  showLabelWithLoading = false,
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
        },
        className
      )}
      disabled={disabled || loading}
      role="button"
      data-cui-type={type}
      data-cui-align={align}
      data-cui-loading={loading ? "true" : undefined}
      {...delegated}
    >
      {!loading && (
        <>
          {iconLeft && (
            <Icon
              name={iconLeft}
              aria-hidden
              size="sm"
              className={styles.cuiButtonIcon}
            />
          )}

          {label ?? children}

          {iconRight && (
            <Icon
              name={iconRight}
              aria-hidden
              size="sm"
              className={styles.cuiButtonIcon}
            />
          )}
        </>
      )}
      {loading && (
        <div
          className={styles.cuiLoadingIconWrapper}
          data-testid="click-ui-loading-icon-wrapper"
        >
          <Icon
            name="loading-animated"
            data-testid="click-ui-loading-icon"
            aria-label="loading"
          />
          {showLabelWithLoading ? (label ?? children) : ""}
        </div>
      )}
    </button>
  );
};
