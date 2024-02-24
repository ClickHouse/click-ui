import { ChangeEvent, InputHTMLAttributes, forwardRef, useId, useRef } from "react";
import { Icon } from "@/components";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
import { mergeRefs } from "@/utils/mergeRefs";

export interface SearchFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "type" | "string" | "onChange" | "dir"
    > {
  loading?: boolean;
  value?: string;
  clear?: boolean;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
  isFilter?: boolean;
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
      orientation,
      dir,
      isFilter,
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
        orientation={orientation}
        dir={dir}
      >
        <Icon
          name={isFilter ? "filter" : "search"}
          size="sm"
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
            aria-label="clear input"
            data-testid="search-close"
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
