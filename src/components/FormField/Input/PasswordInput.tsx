import { useState } from "react";
import { Icon } from "../..";
import { PasswordInputProps } from "./types";
import { IconButton } from "./InputStyledComponents";
import Container from "./Container";

export const PasswordInput = ({ type, disabled, ...props }: PasswordInputProps) => {
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const togglePasswordViewer = () => {
    setViewPassword((viewPassword: boolean) => !viewPassword);
  };

  return (
    <Container
      type="password"
      disabled={disabled}
      {...props}
    >
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
    </Container>
  );
};
