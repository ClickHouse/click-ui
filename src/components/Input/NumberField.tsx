import { ChangeEvent, InputHTMLAttributes, forwardRef, useId } from "react";
import { Icon } from "@/components";
import { InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
export interface NumberFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "dir"> {
  type?: "number";
  loading: boolean;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      disabled,
      label,
      error,
      id,
      loading,
      onChange: onChangeProp,
      orientation,
      dir,
      ...props
    },
    ref
  ) => {
    const defaultId = useId();
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProp(e.target.value, e);
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
        <InputElement
          ref={ref}
          type="number"
          id={id ?? defaultId}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
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
