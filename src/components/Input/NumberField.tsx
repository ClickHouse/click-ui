import { ChangeEvent, InputHTMLAttributes, forwardRef, useId } from "react";
import { Icon } from "@/components";
import { InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
export interface NumberFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  type?: "number";
  loading: boolean;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ disabled, label, error, id, loading, onChange: onChangeProp, ...props }, ref) => {
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
            name="loading"
            size="small"
          />
        )}
      </InputWrapper>
    );
  }
);
