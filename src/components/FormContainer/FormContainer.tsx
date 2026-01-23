import { HTMLAttributes, ReactNode } from "react";
import { Error, FormElementContainer, FormRoot } from "../commonElement";
import { HorizontalDirection, Label, Orientation } from "..";

export interface FormContainerProps extends HTMLAttributes<HTMLDivElement> {
  htmlFor: string;
  label?: ReactNode;
  orientation?: Orientation;
  dir?: HorizontalDirection;
  error?: ReactNode;
  children: ReactNode;
  addLabelPadding?: boolean;
}

export const FormContainer = ({
  id,
  label,
  orientation,
  dir,
  error,
  children,
  addLabelPadding,
  ...props
}: FormContainerProps) => (
  <FormRoot
    $orientation={orientation}
    $dir={dir}
    $addLabelPadding={addLabelPadding}
    {...props}
  >
    <FormElementContainer>
      {children}
      {!!error && error !== true && <Error>{error}</Error>}
    </FormElementContainer>
    {label && (
      <Label
        htmlFor={id}
        error={!!error}
      >
        {label}
      </Label>
    )}
  </FormRoot>
);
