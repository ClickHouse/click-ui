import { ChangeEvent, InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { Icon } from "@/components";
import { IconButton, InputElement, InputWrapper, WrapperProps } from "./InputWrapper";
export interface PasswordFieldProps
  extends Omit<WrapperProps, "id" | "children">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "type" | "string" | "onChange" | "dir"
    > {
  type?: "password";
  value?: string;
  onChange: (inputValue: string, e?: ChangeEvent<HTMLInputElement>) => void;
  orientation?: "vertical" | "horizontal";
  dir?: "start" | "end";
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      disabled,
      label,
      error,
      id,
      value = "",
      onChange: onChangeProp,
      orientation,
      dir,
      ...props
    },
    ref
  ) => {
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
        orientation={orientation}
        dir={dir}
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
        <IconButton
          disabled={disabled}
          onClick={togglePasswordViewer}
          $show={value.length > 0}
        >
          <Icon
            name={viewPassword ? "eye-closed" : "eye"}
            size="md"
          />
        </IconButton>
      </InputWrapper>
    );
  }
);
