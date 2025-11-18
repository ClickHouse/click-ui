import { Label } from "@/components";
import React, { ReactNode } from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import styles from "./InputWrapper.module.scss";

const FormRoot = ({
  children,
  orientation = "vertical",
  dir = "start",
  addLabelPadding,
}: {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  dir?: "start" | "end";
  addLabelPadding?: boolean;
}) => {
  const getFlexDirection = () => {
    if (orientation === "horizontal") {
      return dir === "start" ? "row-reverse" : "row";
    }
    return dir === "start" ? "column-reverse" : "column";
  };

  const orientationClass = `cuiOrientation${capitalize(orientation)}`;
  const dirClass = `cuiDir${capitalize(dir)}`;

  return (
    <div
      className={clsx(
        styles.cuiFormRoot,
        styles[orientationClass],
        styles[dirClass],
        {
          [styles.cuiLabelPadding]: addLabelPadding && orientation === "horizontal",
        }
      )}
      data-cui-orientation={orientation}
      data-cui-dir={dir}
      style={{ flexDirection: getFlexDirection() }}
    >
      {children}
    </div>
  );
};

const FormElementContainer = ({ children }: { children: ReactNode }) => (
  <div className={styles.cuiFormElementContainer}>{children}</div>
);

const Error = ({ children }: { children: ReactNode }) => (
  <div className={styles.cuiErrorMessage}>{children}</div>
);

export interface WrapperProps {
  className?: string;
  id: string;
  label?: ReactNode;
  labelColor?: string;
  error?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const InputWrapper = ({
  className,
  id,
  label = "",
  labelColor,
  error,
  disabled,
  children,
  orientation,
  dir,
  resize = "none",
}: WrapperProps) => {
  const resizeClass = resize !== "none" ? `cuiResize${capitalize(resize)}` : undefined;

  return (
    <FormRoot
      orientation={orientation}
      dir={dir}
      addLabelPadding
    >
      <FormElementContainer>
        <div
          className={clsx(
            styles.cuiWrapper,
            {
              [styles.cuiError]: !!error,
              [styles.cuiDisabled]: disabled,
              [styles[resizeClass!]]: resizeClass,
            },
            className
          )}
          data-cui-resize={resize}
        >
          {children}
        </div>
        {!!error && error !== true && <Error>{error}</Error>}
      </FormElementContainer>
      {label && (
        <Label
          htmlFor={id}
          disabled={disabled}
          error={!!error}
          className={styles.cuiLabel}
          style={labelColor ? { color: labelColor } : undefined}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

export interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasStartContent?: boolean;
  hasEndContent?: boolean;
}

export const InputElement = React.forwardRef<HTMLInputElement, InputElementProps>(
  ({ hasStartContent, hasEndContent, className, ...props }, ref) => {
    const paddingType = hasStartContent && hasEndContent
      ? "none"
      : hasStartContent
      ? "end"
      : hasEndContent
      ? "start"
      : "both";

    const paddingClass = `cuiPadding${capitalize(paddingType)}`;

    return (
      <input
        className={clsx(styles.cuiInputElement, styles[paddingClass], className)}
        data-cui-padding={paddingType}
        ref={ref}
        {...props}
      />
    );
  }
);

export interface NumberInputElementProps extends InputElementProps {
  hideControls?: boolean;
}

export const NumberInputElement = React.forwardRef<
  HTMLInputElement,
  NumberInputElementProps
>(({ hideControls, className, ...props }, ref) => (
  <InputElement
    {...props}
    ref={ref}
    type="number"
    className={clsx(styles.cuiNumberInputElement, className, {
      [styles.cuiHideNumberControls]: hideControls,
    })}
  />
));

export interface TextAreaElementProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextAreaElement = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaElementProps
>(({ className, ...props }, ref) => (
  <textarea
    className={clsx(styles.cuiTextareaElement, className)}
    ref={ref}
    {...props}
  />
));

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton = ({ className, ...props }: IconButtonProps) => (
  <button
    className={clsx(styles.cuiIconButton, className)}
    {...props}
  />
);

export interface IconWrapperProps extends React.SVGAttributes<SVGElement> {}

export const IconWrapper = ({ className, ...props }: IconWrapperProps) => (
  <svg
    className={clsx(styles.cuiIconWrapper, className)}
    {...props}
  />
);

export interface InputStartContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputStartContent = ({ className, ...props }: InputStartContentProps) => (
  <div
    className={clsx(styles.cuiInputStartContent, className)}
    {...props}
  />
);

export interface InputEndContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputEndContent = ({ className, ...props }: InputEndContentProps) => (
  <div
    className={clsx(styles.cuiInputEndContent, className)}
    {...props}
  />
);
