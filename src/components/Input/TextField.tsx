import { ChangeEvent, InputHTMLAttributes, forwardRef, useId, useRef } from "react";
import { Icon } from "@/components";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";

export interface TextFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "type" | "value" | "onChange" | "dir"
    > {
  type?: "text" | "email" | "tel" | "url";
  loading?: boolean;
  labelColor?: string;
  value?: string;
  clear?: boolean;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      clear,
      type,
      disabled,
      label,
      labelColor,
      error,
      id,
      loading,
      value = "",
      onChange: onChangeProp,
      orientation,
      dir,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultId = useId();
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProp(e.target.value, e);
    };
    const clearInput = () => {
      onChangeProp("");
    };

    return (
      <InputWrapper
        disabled={disabled}
        id={id ?? defaultId}
        label={label}
        labelColor={labelColor}
        error={error}
        orientation={orientation}
        dir={dir}
      >
        <InputElement
          ref={mergeRefs([inputRef, ref])}
          type={type}
          id={id ?? defaultId}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />

        {clear && (
          <IconButton
            disabled={disabled}
            onClick={clearInput}
            $show={value.length > 0}
            aria-label="clear input"
          >
            <Icon
              name="cross"
              size="sm"
            />
          </IconButton>
        )}
        {loading && (
          <Icon
            name="loading-animated"
            size="sm"
          />
        )}
      </InputWrapper>
    );
  }
);
