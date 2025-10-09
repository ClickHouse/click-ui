"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { HTMLAttributes, ReactNode, useId } from "react";
import clsx from "clsx";
import { GenericLabel, Label } from "@/components";
import { Error, FormElementContainer, FormRoot } from "@/components/commonElement";
import styles from "./RadioGroup.module.scss";

export interface RadioGroupProps extends Omit<RadixRadioGroup.RadioGroupProps, "dir"> {
  inline?: boolean;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
  itemDir?: "rtl" | "ltr";
  label?: ReactNode;
  error?: ReactNode;
}

export const RadioGroup = ({
  children,
  inline,
  orientation,
  dir,
  error,
  itemDir,
  label,
  disabled,
  id,
  ...props
}: RadioGroupProps) => {
  return (
    <FormRoot
      orientation={orientation}
      dir={dir}
      addLabelPadding
    >
      <FormElementContainer>
        <RadixRadioGroup.Root
          orientation={inline ? "horizontal" : "vertical"}
          disabled={disabled}
          id={id}
          dir={itemDir}
          className={clsx(styles.cuiRadioGroupRoot, {
            [styles.cuiInline]: inline,
            [styles.cuiVertical]: !inline,
            [styles.cuiError]: !!error,
          })}
          {...props}
        >
          {children}
        </RadixRadioGroup.Root>
        {!!error && error !== true && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id}
          disabled={disabled}
          error={!!error}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

interface RadioGroupInputProps extends RadixRadioGroup.RadioGroupItemProps {
  label?: ReactNode;
}

export type RadioGroupItemProps = RadioGroupInputProps &
  Omit<HTMLAttributes<HTMLDivElement>, "dir">;

const RadioGroupItem = ({
  id,
  label,
  value,
  disabled,
  required,
  ...props
}: RadioGroupItemProps) => {
  const defaultId = useId();
  return (
    <FormRoot
      {...props}
      orientation="horizontal"
      dir="end"
      addLabelPadding={false}
      className={styles.cuiWrapper}
    >
      <RadixRadioGroup.Item
        value={value}
        id={id ?? defaultId}
        disabled={disabled}
        required={required}
        aria-label={`${label}`}
        className={styles.cuiRadioInput}
      >
        <RadixRadioGroup.Indicator className={styles.cuiRadioGroupIndicator} />
      </RadixRadioGroup.Item>
      {label && (
        <GenericLabel
          htmlFor={id ?? defaultId}
          disabled={disabled}
        >
          {label}
        </GenericLabel>
      )}
    </FormRoot>
  );
};

RadioGroupItem.displayName = "RadioGroupItem";
RadioGroup.Item = RadioGroupItem;
