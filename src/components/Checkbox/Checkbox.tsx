"use client";

import { GenericLabel, Icon } from "@/components";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { ReactNode, useId } from "react";
import clsx from "clsx";
import { capitalize } from "../../utils/capitalize";
import styles from "./Checkbox.module.scss";

export type CheckboxVariants =
  | "default"
  | "var1"
  | "var2"
  | "var3"
  | "var4"
  | "var5"
  | "var6";

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  /** The label text displayed next to the checkbox */
  label?: ReactNode;
  /** The orientation of the label relative to the checkbox */
  orientation?: "vertical" | "horizontal";
  /** The color variant of the checkbox */
  variant?: CheckboxVariants;
  /** The direction/position of the label - start places label before, end places label after */
  dir?: "start" | "end";
}

export const Checkbox = ({
  id,
  label,
  variant = "default",
  disabled,
  orientation = "horizontal",
  dir = "end",
  checked,
  className,
  ...delegated
}: CheckboxProps) => {
  const defaultId = useId();

  const variantClass = `cuiVariant${capitalize(variant)}`;
  const orientationClass = `cuiOrientation${capitalize(orientation)}`;
  const dirClass = `cuiDir${capitalize(dir)}`;
  const checkedClass = checked === true ? "cuiCheckedTrue" : checked === "indeterminate" ? "cuiCheckedIndeterminate" : "";
  const disabledClass = disabled ? "cuiDisabled" : "";

  return (
    <div
      className={clsx(
        styles.cuiWrapper,
        styles[orientationClass],
        styles[dirClass],
        className
      )}
      data-cui-orientation={orientation}
      data-cui-dir={dir}
    >
      <RadixCheckbox.Root
        id={id ?? defaultId}
        data-testid="checkbox"
        disabled={disabled}
        aria-label={`${label}`}
        checked={checked}
        className={clsx(
          styles.cuiCheckInput,
          styles[variantClass],
          checkedClass && styles[checkedClass],
          disabledClass && styles[disabledClass]
        )}
        data-cui-variant={variant}
        data-cui-checked={checked === true ? "true" : checked === "indeterminate" ? "indeterminate" : undefined}
        data-cui-disabled={disabled ? "true" : undefined}
        {...delegated}
      >
        <RadixCheckbox.Indicator
          className={clsx(
            styles.cuiCheckIconWrapper,
            disabledClass && styles[disabledClass]
          )}
        >
          <Icon
            name={checked === "indeterminate" ? "minus" : "check"}
            size="sm"
          />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
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
};
