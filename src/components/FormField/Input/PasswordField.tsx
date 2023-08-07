import { ChangeEvent, InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { Icon } from "../..";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
interface PasswordFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "type" | "string" | "onChange"
    > {
  type?: "password";
  value?: string;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ disabled, label, error, id, value = "", onChange: onChangeProp, ...props }, ref) => {
    const defaultId = useId();
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const togglePasswordViewer = () => {
      setViewPassword((viewPassword: boolean) => !viewPassword);
    };

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
          type={viewPassword ? "text" : "password"}
          id={id ?? defaultId}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />
        {value.length > 0 && (
          <IconButton
            disabled={disabled}
            onClick={togglePasswordViewer}
          >
            <Icon
              name={viewPassword ? "eye-closed" : "eye"}
              size="medium"
            />
          </IconButton>
        )}
      </InputWrapper>
    );
  }
);
