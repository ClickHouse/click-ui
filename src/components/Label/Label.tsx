import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Label.module.scss";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** Whether the label is disabled */
  disabled?: boolean;
  /** Whether to show error styling */
  error?: boolean;
  /** The ID of the form element this label is for */
  htmlFor?: string;
}

export const Label = ({ disabled, error, children, ...props }: LabelProps) => {
  const stateClass = disabled
    ? "cuiStateDisabled"
    : error
      ? "cuiStateError"
      : "cuiStateDefault";

  return (
    <label
      {...props}
      className={clsx(styles.cuiLabel, styles[stateClass], props.className)}
      data-cui-state={disabled ? "disabled" : error ? "error" : "default"}
    >
      {children}
    </label>
  );
};
