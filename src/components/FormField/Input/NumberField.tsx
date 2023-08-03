import { InputHTMLAttributes, forwardRef, useId } from "react";
import { Icon } from "../..";
import { InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
interface NumberInputProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "number";
  loading: boolean;
}

export const NumberField = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ disabled, label, error, id, loading, ...props }, ref) => {
    const defaultId = useId();
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
