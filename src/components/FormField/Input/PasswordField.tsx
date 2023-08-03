import { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { Icon } from "../..";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
interface PasswordFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "type" | "string"> {
  type?: "password";
  value?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ disabled, label, error, id, value = "", ...props }, ref) => {
    const defaultId = useId();
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const togglePasswordViewer = () => {
      setViewPassword((viewPassword: boolean) => !viewPassword);
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
          type={viewPassword ? "text" : "password"}
          id={id ?? defaultId}
          disabled={disabled}
          value={value}
          {...props}
        />
        {value.length > 0 && (
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
        )}
      </InputWrapper>
    );
  }
);
