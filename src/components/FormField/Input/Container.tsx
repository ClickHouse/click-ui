import { ChangeEvent, useEffect, useId, useState } from "react";
import { Error, FormRoot } from "../commonElement";
import { Icon, Label } from "../..";
import { InputProps, PasswordInputProps } from "./types";
import { InputContainer, InputElement, IconButton } from "./InputStyledComponents";

const Container = ({
  id,
  label,
  error,
  type,
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
  loading,
  children,
  ...props
}: InputProps | PasswordInputProps) => {
  const defaultId = useId();
  const [value, setValue] = useState(valueProp ?? "");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    onChangeProp && onChangeProp(e);
  };

  const clearInput = () => {
    setValue("");
  };

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <FormRoot {...props}>
      {error && <Error>{error}</Error>}
      <InputContainer error={typeof error !== "undefined"}>
        <InputElement
          type={type}
          id={id ?? defaultId}
          value={value}
          disabled={disabled}
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
        {children}
        {loading && (
          <IconButton
            disabled={disabled}
            onClick={clearInput}
          >
            <Icon
              name="loading"
              size="small"
            />
          </IconButton>
        )}
      </InputContainer>
      {label && (
        <Label
          htmlFor={id ?? defaultId}
          disabled={disabled}
          error={typeof error !== "undefined"}
        >
          {label}
        </Label>
      )}
    </FormRoot>
  );
};

export default Container;
