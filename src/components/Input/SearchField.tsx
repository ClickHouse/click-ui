import { ChangeEvent, InputHTMLAttributes, forwardRef, useId, useRef } from "react";
import { Icon } from "@/components";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";

export interface SearchFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "type" | "string" | "onChange"
    > {
  loading?: boolean;
  value?: string;
  clear?: boolean;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      disabled,
      label,
      error,
      id,
      loading,
      clear = true,
      value = "",
      onChange: onChangeProp,
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
        error={error}
      >
        <Icon
          name="search"
          size="small"
        />
        <InputElement
          ref={mergeRefs([inputRef, ref])}
          type="text"
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
          >
            <Icon
              name="cross"
              size="small"
            />
          </IconButton>
        )}
        {loading && (
          <Icon
            name="loading-animated"
            size="small"
          />
        )}
      </InputWrapper>
    );
  }
);
