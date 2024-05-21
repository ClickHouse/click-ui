import { Error, FormElementContainer, FormRoot } from "../commonElement";
import { Label } from "@/components";
import styled from "styled-components";
import { ReactNode } from "react";

const Wrapper = styled.div<{
  $error: boolean;
  $resize: "none" | "vertical" | "horizontal" | "both";
}>`
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

  ${({ theme, $error, $resize }) => `
    gap: ${theme.click.field.space.gap};
    border-radius: ${theme.click.field.radii.all};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};

    *:autofill,
    *:-webkit-autofill  {
      -webkit-box-shadow: 0 0 0px 50vh ${
        theme.click.field.color.background.default
      } inset;
      -webkit-text-fill-color: ${theme.click.field.color.text.default};
      caret-color: ${theme.click.field.color.text.default};
    }

    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};

      *:autofill,
      *:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 50vh ${
          theme.click.field.color.background.hover
        } inset;
        -webkit-text-fill-color: ${theme.click.field.color.text.hover};
        caret-color: ${theme.click.field.color.text.hover};
      }
    }
    ${
      $resize === "none"
        ? ""
        : `
      resize: ${$resize};
      overflow: auto;
    `
    }
    padding: 0 ${theme.click.field.space.x};
    ${
      $error
        ? `
      font: ${theme.click.field.typography.fieldText.error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.error};

      *:autofill,
      *:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 50vh ${theme.click.field.color.background.error} inset;
        -webkit-text-fill-color: ${theme.click.field.color.text.error};
        caret-color: ${theme.click.field.color.text.error};
      }

      &:hover {
        border: 1px solid ${theme.click.field.color.stroke.error};
        color: ${theme.click.field.color.text.error};
        *:autofill,
        *:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 50vh ${theme.click.field.color.background.error} inset;
          -webkit-text-fill-color: ${theme.click.field.color.text.error};
          caret-color: ${theme.click.field.color.text.error};
        }
      }
    `
        : `
    &:focus-within,
    &[data-state="open"] {
      font: ${theme.click.field.typography.fieldText.active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};

      *:autofill,
      *:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 50vh ${theme.click.field.color.background.active} inset;
        -webkit-text-fill-color: ${theme.click.field.color.text.active};
        caret-color: ${theme.click.field.color.text.active};
      }
    }
    `
    };
    &:disabled, &.disabled {
      font: ${theme.click.field.typography.fieldText.disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};

      *:autofill,
      *:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 50vh ${
          theme.click.field.color.background.disabled
        } inset;
        -webkit-text-fill-color: ${theme.click.field.color.text.disabled};
        caret-color: ${theme.click.field.color.text.disabled};
      }
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
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const InputWrapper = ({
  id,
  label = "",
  error,
  disabled,
  children,
  orientation,
  dir,
  resize = "none",
}: WrapperProps) => {
  return (
    <FormRoot
      $orientation={orientation}
      $dir={dir}
      $addLabelPadding
    >
      <FormElementContainer>
        <Wrapper
          $error={!!error}
          $resize={resize}
          data-resize={resize}
          className={disabled ? "disabled" : ""}
        >
          {children}
        </Wrapper>
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
    padding: ${theme.click.field.space.y} 0;
    &::placeholder {
      color: ${theme.click.field.color.placeholder.default};
    }
  `}
`;

export const NumberInputElement = styled(InputElement)<{ $hideControls?: boolean }>`
  ${({ $hideControls }) => `
    ${
      $hideControls
        ? `
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }X

    -moz-appearance: textfield;
    `
        : ""
    }
  `}
`;

export const TextAreaElement = styled.textarea`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: inherit;
  font: inherit;
  resize: none;
  ${({ theme }) => `
    padding: ${theme.click.field.space.y} 0;
    align-self: stretch;
    &::placeholder {
      color: ${theme.click.field.color.placeholder.default};
    }
  `}
`;

export const TextAreaWrapper = styled(InputWrapper)`
  resize: vertical;
  overflow: auto;
  color: red;
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
