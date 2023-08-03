import { InputHTMLAttributes, forwardRef, useId, useRef } from "react";
import { Icon } from "../..";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";
import { mockInputChangeEvent } from "./mockInputChangeEvent";
interface TextInputProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "type" | "string"> {
  loading?: boolean;
  value?: string;
  clear?: boolean;
}

export const SearchField = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { disabled, label, error, id, loading, clear = true, value = "", onChange, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultId = useId();
    const clearInput = () => {
      mockInputChangeEvent(inputRef.current, onChange);
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
        {loading && (
          <Icon
            name="loading"
            size="small"
          />
        )}
      </InputWrapper>
    );
  }
);
