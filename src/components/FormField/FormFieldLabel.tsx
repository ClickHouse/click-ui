import React, { HTMLAttributes } from "react";
import styled from "styled-components";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  error?: boolean;
  htmlFor?: string;
}

const Label = styled.label<LabelProps>`
  ${({ theme, disabled, error }) => `
    ${
      disabled
        ? `
    color: ${theme.click.field.color.label.disabled};
    font: ${theme.click.field.typography.label.disabled};
    `
        : error
        ? `
    color: ${theme.click.field.color.label.error};
    font: ${theme.click.field.typography.label.error};
    `
        : `
    color: ${theme.click.field.color.label.default};
    font: ${theme.click.field.typography.label.default};
    &:hover {
      color: ${theme.click.field.color.label.hover};
      font: ${theme.click.field.typography.label.hover};
    }
    &:focus, &:focus-within {
      color: ${theme.click.field.color.label.active};
      font: ${theme.click.field.typography.label.active};
    }
    `
    };
  `}
`;

const FormFieldLabel = ({ disabled, error, children, ...props }: LabelProps) => (
  <Label
    disabled={disabled}
    error={error}
    {...props}
  >
    {children}
  </Label>
);

export default FormFieldLabel;
