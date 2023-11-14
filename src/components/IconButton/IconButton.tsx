import { Icon, IconName } from "@/components";
import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "xs";
  disabled?: boolean;
  type?: "primary" | "secondary" | "ghost" | "danger" | "info";
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "primary", icon, size, ...props }, ref) => {
    const iconName = icon ? icon.toString() : "unknown icon";

    return (
      <Button
        {...props}
        $styleType={type}
        $size={size}
        ref={ref}
        role="button"
        aria-label={iconName}
      >
        <Icon
          name={icon}
          size="sm"
        />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

const Button = styled.button<{
  $styleType?: "primary" | "secondary" | "ghost" | "danger" | "info";
  $size?: "default" | "sm" | "xs";
}>`
  ${({ theme, $size, $styleType = "primary" }) => `
  border-radius: ${theme.click.button.iconButton.radii.all};
  border: ${theme.click.button.stroke} solid ${
    theme.click.button.iconButton.color[$styleType].stroke.default
  };
  cursor: pointer;
  padding: ${
    $size
      ? `${theme.click.button.iconButton[$size].space.y} ${theme.click.button.iconButton[$size].space.x}`
      : `${theme.click.button.iconButton.default.space.y} ${theme.click.button.iconButton.default.space.x}`
  };

  background-color: ${theme.click.button.iconButton.color[$styleType].background.default};

  color: ${theme.click.button.iconButton.color[$styleType].text.default};

  &:hover {
    background-color: ${theme.click.button.iconButton.color[$styleType].background.hover};
    color: ${theme.click.button.iconButton.color[$styleType].text.hover};
    border-color: ${theme.click.button.iconButton.color[$styleType].stroke.hover};
  }

  &:focus, &:active, &:focus-within {
    background-color: ${
      theme.click.button.iconButton.color[$styleType].background.active
    };
    color: ${theme.click.button.iconButton.color[$styleType].text.active};
    border-color: ${theme.click.button.iconButton.color[$styleType].stroke.active};
  }

  &[disabled] {
    background-color: ${theme.click.button.iconButton.color.disabled.background.default};
    color: ${theme.click.button.iconButton.color.disabled.text.default};
    cursor: not-allowed;
  }
  `}
`;
