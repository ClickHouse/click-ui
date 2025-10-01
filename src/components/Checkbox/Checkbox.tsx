import { GenericLabel, Icon } from "@/components";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { ReactNode, useId } from "react";
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
  ...delegated
}: CheckboxProps) => {
  const defaultId = useId();
  return (
    <div
      className={clsx(styles.cuiWrapper, {
        [styles.cuiHorizontal]: orientation === "horizontal",
        [styles.cuiVertical]: orientation === "vertical",
        [styles.cuiDirStart]: dir === "start",
        [styles.cuiDirEnd]: dir === "end",
      })}
    >
      <RadixCheckbox.Root
        id={id ?? defaultId}
        data-testid="checkbox"
        disabled={disabled}
        aria-label={`${label}`}
        checked={checked}
        className={clsx(styles.cuiCheckInput, {
          [styles.cuiVariantDefault]: variant === "default",
          [styles.cuiVariantVar1]: variant === "var1",
          [styles.cuiVariantVar2]: variant === "var2",
          [styles.cuiVariantVar3]: variant === "var3",
          [styles.cuiVariantVar4]: variant === "var4",
          [styles.cuiVariantVar5]: variant === "var5",
          [styles.cuiVariantVar6]: variant === "var6",
          [styles.cuiChecked]: checked === true,
          [styles.cuiIndeterminate]: checked === "indeterminate",
          [styles.cuiDisabled]: disabled,
        })}
        {...delegated}
      >
        <RadixCheckbox.Indicator
          className={clsx(styles.cuiCheckIconWrapper, {
            [styles.cuiDisabled]: disabled,
          })}
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
