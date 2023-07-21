import { ChangeEvent, HTMLAttributes, ReactNode, useState } from "react";
import { Error, FormRoot, Label } from "./commonElement";
import styled from "styled-components";
import { Icon } from "..";

const InputContainer = styled.div<{ error: boolean }>`
  width: 100%;
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

  ${({ theme, error }) => `
    border-radius: ${theme.click.field.radii.all};
    font: ${theme.click.field.typography["field-text"].default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};
    }
    & > input {
      padding-top: ${theme.click.field.space.y};
      padding-bottom: ${theme.click.field.space.y};
      padding-left: ${theme.click.field.space.x};
    }
    ${
      error
        ? `
      font: ${theme.click.field.typography["field-text"].error};
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
      font: ${theme.click.field.typography["field-text"].active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};
      &~ label {
      color: ${theme.click.field.color.label.active};
      font: ${theme.click.field.typography.label.active};;
    }
    }
    `
    };
    &:disabled {
      font: ${theme.click.field.typography["field-text"].disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};
    }
  `}
`;

const InputElement = styled.input<{ error: boolean }>`
  background: transparent;
  border: none;
  outline: none;
  width: fill-available;
  color: inherit;
  font: inherit;
  ${({ theme }) => `
    &::placeholder {
      color: ${theme.click.field.color.placeholder.default};
    }
  `}
`;

const IconButton = styled.button`
  background: transparent;
  color: inherit;
  border: none;
  padding: 0;
  outline: none;
  &:not(:disabled) {
    cursor: pointer;
  }
  ${({ theme }) => `
    &:first-of-type {
      padding-left: ${theme.click.field.space.gap};
    }
    &:last-of-type {
      padding-right: ${theme.click.field.space.x};
    }
  `}
`;

interface CommonProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  clear?: boolean;
  label: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  form?: string;
  alt?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  dir?: string;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
}

interface TextInput extends CommonProps {
  type: "text" | "password" | "email" | "tel" | "url";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  size: number;
  min: never;
  max: never;
  step: never;
}

interface NumberInput extends CommonProps {
  type: "number";
  min?: string;
  max?: string;
  step?: string;
  minLength: never;
  maxLength?: never;
  pattern: never;
  size: never;
}

type Props = TextInput | NumberInput;

const Input = ({
  id,
  label,
  error,
  type = "text",
  disabled,
  clear,
  value: valueProp,
  placeholder,
  onChange: onChangeProp,
  onFocus,
  onBlur,
  onContextMenu,
  onInput,
  onInvalid,
  onKeyDown,
  onKeyUp,
  onCut,
  onCopy,
  onPaste,
  form,
  alt,
  autoComplete,
  autoFocus,
  dir,
  min,
  minLength,
  maxLength,
  max,
  size,
  name,
  pattern,
  readOnly,
  required,
  step,
  ...props
}: Props) => {
  const [value, setValue] = useState(valueProp ?? "");
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const togglePasswordViewer = () => {
    setViewPassword((viewPassword: boolean) => !viewPassword);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    onChangeProp && onChangeProp(e);
  };

  const clearInput = () => {
    setValue("");
  };

  return (
    <FormRoot {...props}>
      {error && <Error>{error}</Error>}
      <InputContainer error={typeof error !== "undefined"}>
        <InputElement
          type={type === "password" && viewPassword ? "text" : type}
          id={id}
          value={value}
          disabled={disabled}
          error={typeof error !== "undefined"}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          onContextMenu={onContextMenu}
          onInput={onInput}
          onInvalid={onInvalid}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          form={form}
          alt={alt}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          dir={dir}
          min={min}
          minLength={minLength}
          maxLength={maxLength}
          max={max}
          size={size}
          name={name}
          pattern={pattern}
          readOnly={readOnly}
          required={required}
          step={step}
        />
        {clear && value.length > 0 && (
          <IconButton
            disabled={disabled}
            onClick={clearInput}
          >
            <Icon
              name="cross"
              size="small"
            />
          </IconButton>
        )}
        {type === "password" ? (
          <IconButton
            disabled={disabled}
            onClick={togglePasswordViewer}
          >
            {viewPassword ? (
              <Icon
                name="eye-closed"
                size="medium"
              />
            ) : (
              <Icon
                name="eye"
                size="medium"
              />
            )}
          </IconButton>
        ) : null}
      </InputContainer>
      {label && (
        <Label
          htmlFor={id}
          disabled={disabled}
          error={typeof error !== "undefined"}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

export default Input;
