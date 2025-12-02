"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";
import { ReactNode, forwardRef, useId } from "react";
import { GenericLabel } from "@/components";
import { capitalize } from "../../utils/capitalize";
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

    const orientationClass = `cuiOrientation${capitalize(orientation)}`;
    const dirClass = `cuiDir${capitalize(dir)}`;
    const checkedClass = checked ? "cuiChecked" : "";
    const disabledClass = disabled ? "cuiDisabled" : "";

    return (
      <div
        className={clsx(
          styles.cuiWrapper,
          styles[orientationClass],
          styles[dirClass]
        )}
        data-cui-orientation={orientation}
        data-cui-dir={dir}
      >
        <RadixSwitch.Root
          ref={ref}
          id={id ?? defaultId}
          disabled={disabled}
          aria-label={`${label}`}
          checked={checked}
          className={clsx(
            styles.cuiSwitchRoot,
            checkedClass && styles[checkedClass],
            disabledClass && styles[disabledClass]
          )}
          data-cui-checked={checked ? "true" : undefined}
          data-cui-disabled={disabled ? "true" : undefined}
          {...props}
        >
          <RadixSwitch.Thumb
            className={clsx(
              styles.cuiSwitchThumb,
              checkedClass && styles[checkedClass],
              disabledClass && styles[disabledClass]
            )}
            data-cui-checked={checked ? "true" : undefined}
            data-cui-disabled={disabled ? "true" : undefined}
          />
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
