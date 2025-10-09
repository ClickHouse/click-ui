"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import { ReactNode, forwardRef, useId } from "react";
import clsx from "clsx";
import { GenericLabel } from "@/components";
import styles from "./Switch.module.scss";

interface RootProps {
  checked: boolean;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
  label?: ReactNode;
}

type SwitchProps = RootProps & Omit<RadixSwitch.SwitchProps, "dir">;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked, disabled, orientation = "vertical", dir = "start", label, id, ...props },
    ref
  ) => {
    const defaultId = useId();

    const wrapperClasses = clsx(styles.cuiWrapper, {
      [styles.cuiHorizontal]: orientation === "horizontal",
      [styles.cuiVertical]: orientation === "vertical",
      [styles.cuiDirStart]: dir === "start",
    });

    const switchRootClasses = clsx(styles.cuiSwitchRoot, {
      [styles.cuiChecked]: checked,
      [styles.cuiDisabled]: disabled,
    });

    const switchThumbClasses = clsx(styles.cuiSwitchThumb, {
      [styles.cuiChecked]: checked,
      [styles.cuiDisabled]: disabled,
    });

    return (
      <div className={wrapperClasses}>
        <RadixSwitch.Root
          ref={ref}
          id={id ?? defaultId}
          disabled={disabled}
          aria-label={`${label}`}
          checked={checked}
          className={switchRootClasses}
          {...props}
        >
          <RadixSwitch.Thumb className={switchThumbClasses} />
        </RadixSwitch.Root>
        {label && (
          <GenericLabel
            htmlFor={id ?? defaultId}
            disabled={disabled}
          >
            {label}
          </GenericLabel>
        )}
      </div>
    );
  }
);
