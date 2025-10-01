import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./GenericLabel.module.scss";

export interface GenericLabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** Whether the label is disabled */
  disabled?: boolean;
  /** The ID of the form element this label is for */
  htmlFor?: string;
}

export const GenericLabel = ({ disabled, children, ...props }: GenericLabelProps) => (
  <label
    {...props}
    className={clsx(
      styles.cuiGenericLabel,
      {
        [styles.cuiDisabled]: disabled,
      },
      props.className
    )}
  >
    {children}
  </label>
);
