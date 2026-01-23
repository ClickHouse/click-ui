import { Icon, IconName } from "..";
import { HTMLAttributes, forwardRef } from "react";
import { styled } from "styled-components";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** The size of the icon button */
  size?: "default" | "sm" | "xs";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The visual style variant of the button */
  type?: "primary" | "secondary" | "ghost" | "danger" | "info";
  /** The icon to display in the button */
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "primary", icon, size, disabled, ...props }, ref) => {
    const iconName = icon ? icon.toString() : "unknown icon";

    return (
      <Button
        {...props}
        $styleType={type}
        $size={size}
        disabled={disabled}
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
  &:not([disabled]) {
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
  }
  &:visited {
    background-color: ${
      theme.click.button.iconButton.color[$styleType].background.default
    };
  }

  &[disabled] {
    background-color: ${theme.click.button.iconButton.color.disabled.background.default};
    color: ${theme.click.button.iconButton.color.disabled.text.default};
    cursor: not-allowed;
  }
  `}
`;
