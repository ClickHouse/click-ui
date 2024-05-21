import { HTMLAttributes } from "react";
import styled from "styled-components";

export interface GenericLabelProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  htmlFor?: string;
}

interface FormFieldLableProps extends HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  htmlFor?: string;
}

const FormFieldLabel = styled.label<FormFieldLableProps>`
  ${({ theme, disabled }) => `
    ${
      disabled
        ? `
    color: ${theme.click.field.color.genericLabel.disabled};
    font: ${theme.click.field.typography.genericLabel.disabled};
    `
        : `
    color: ${theme.click.field.color.genericLabel.default};
    font: ${theme.click.field.typography.genericLabel.default};
    &:hover {
      color: ${theme.click.field.color.genericLabel.hover};
      font: ${theme.click.field.typography.genericLabel.hover};
    }
    &:focus, &:focus-within {
      color: ${theme.click.field.color.genericLabel.active};
      font: ${theme.click.field.typography.genericLabel.active};
    }
    `
    };
  `}
`;

export const GenericLabel = ({ disabled, children, ...props }: GenericLabelProps) => (
  <FormFieldLabel
    disabled={disabled}
    {...props}
  >
    {children}
  </FormFieldLabel>
);
