import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  state?: "default" | "active";
  size?: "small" | "default";
  disabled?: boolean;
  display?: "empty" | "filled";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, display = "filled", ...props }, ref) => {
    return (
      <Button {...props} display={display} ref={ref}>
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

const Button = styled.button<IconButtonProps>`
  border-radius: var(--click-button-radii-all);
  border-color: transparent;

  ${({ state, disabled, display }: IconButtonProps) => {
    if (disabled) {
      return `
        background-color: var(--click-button-basic-color-disabled-background-default);
        color: var(--click-button-basic-color-disabled-text-default);
      `;
    }
    if (state === "active") {
      return `
        background-color: ${
          display === "filled"
            ? "var(--click-button-basic-color-primary-background-active)"
            : "var(--click-button-basic-color-secondary-background-active)"
        };
        color: ${
          display === "filled"
            ? "var(--click-button-basic-color-primary-text-default)"
            : "var(--click-button-basic-color-secondary-text-default)"
        };
      `;
    }

    return `
        background-color: ${
          display === "filled"
            ? "var(--click-button-basic-color-primary-background-default)"
            : "transparent"
        };
        color: ${
          display === "filled"
            ? "var(--click-button-basic-color-primary-text-default)"
            : "var(--click-button-basic-color-secondary-text-default)"
        };
      `;
  }};
  ${({ size }: IconButtonProps) => {
    if (size === "small") {
      return `
        padding: var(--click-button-icon-button-space-1);
      `;
    }

    return `
      padding: var(--click-button-icon-button-space-2);
    `;
  }};
  &:hover {
    ${({ disabled, state, display }: IconButtonProps) => {
      if (disabled) {
        return `
          cursor-pointer: not-allowed;
      `;
      }

      if (state !== "active") {
        return `
          background-color: ${
            display === "filled"
              ? "var(--click-button-basic-color-primary-background-hover)"
              : "var(--click-button-basic-color-secondary-background-hover)"
          };
        `;
      }

      return "";
    }}
  }
`;
