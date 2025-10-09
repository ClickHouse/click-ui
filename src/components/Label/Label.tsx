import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Label.module.scss";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  error?: boolean;
  htmlFor?: string;
}

export const Label = ({ disabled, error, children, ...props }: LabelProps) => (
  <label
    {...props}
    className={clsx(
      styles.cuiLabel,
      {
        [styles.cuiDisabled]: disabled,
        [styles.cuiError]: error && !disabled,
      },
      props.className
    )}
  >
    {children}
  </label>
);
