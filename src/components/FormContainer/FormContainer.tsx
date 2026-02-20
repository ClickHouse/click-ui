import { HTMLAttributes, ReactNode } from 'react';
// TODO: Improve api for Common components, types, etc
import { Error, FormElementContainer, FormRoot } from '@/components/commonElement';
import type { HorizontalDirection, Orientation } from '@/components/types';
import { Label } from '@/components/Label';

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
