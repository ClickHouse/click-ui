import { Error, FormElementContainer, FormRoot } from "../commonElement";
import { Label } from "@/components";
import styled from "styled-components";
import { ReactNode } from "react";

const Wrapper = styled.div<{ $error: boolean }>`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;

  span:first-of-type {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme, $error }) => `
    gap: ${theme.click.field.space.gap};
    border-radius: ${theme.click.field.radii.all};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};
    }
    & > input {
      padding: ${theme.click.field.space.y} 0;
    }
    padding: 0 ${theme.click.field.space.x};
    ${
      $error
        ? `
      font: ${theme.click.field.typography.fieldText.error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.error};
      &:hover {
      border: 1px solid ${theme.click.field.color.stroke.error};
      color: ${theme.click.field.color.text.error};
      }
    `
        : `
    &:focus-within,
    &[data-state="open"] {
      font: ${theme.click.field.typography.fieldText.active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};
    }
    `
    };
    &:disabled {
      font: ${theme.click.field.typography.fieldText.disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};
    }
  `}
`;

export interface WrapperProps {
  id: string;
  label?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

export const InputWrapper = ({
  id,
  label = "",
  error,
  disabled,
  children,
  orientation,
  dir,
}: WrapperProps) => {
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
    >
      <FormElementContainer>
        <Wrapper $error={!!error}>{children}</Wrapper>
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

export const InputElement = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: inherit;
  font: inherit;
  ${({ theme }) => `
    &::placeholder {
      color: ${theme.click.field.color.placeholder.default};
    }
  `}
`;

export const IconButton = styled.button<{ $show?: boolean }>`
  background: transparent;
  color: inherit;
  border: none;
  padding: 0;
  outline: none;
  &:not(:disabled) {
    cursor: pointer;
  }
  ${({ theme, $show }) => `
      padding: ${theme.click.field.space.y} 0;
      visibility: ${$show ? "visible" : "hidden"};
  `}
`;

export const IconWrapper = styled.svg`
  ${({ theme }) => `
    &:first-of-type {
      padding-left: ${theme.click.field.space.gap};
    }
    &:last-of-type {
      padding-right: ${theme.click.field.space.x};
    }
  `}
`;
