import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./GenericLabel.module.scss";

export interface GenericLabelProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
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
