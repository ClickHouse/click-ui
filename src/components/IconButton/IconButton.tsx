import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "xs";
  disabled?: boolean;
  type?: "primary" | "secondary";
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "primary", icon, size, ...props }, ref) => {
    return (
      <Button
        {...props}
        $styleType={type}
        $size={size}
        ref={ref}
      >
        <Icon
          name={icon}
          size="md"
        />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

const Button = styled.button<{
  $styleType?: "primary" | "secondary";
  $size?: "sm" | "xs";
}>`
  ${({ theme, $size, $styleType = "primary" }) => `
  border-radius: ${theme.click.button.iconButton.radii.all};
  border-color: ${theme.click.button.iconButton.color.primary.stroke.default};
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
  }

  &:active {
    background-color: ${
      theme.click.button.iconButton.color[$styleType].background.active
    };
    color: ${theme.click.button.iconButton.color[$styleType].text.active};
  }

  &[disabled] {
    background-color: ${theme.click.button.iconButton.color.disabled.background.default};
    color: ${theme.click.button.iconButton.color.disabled.text.default};
  }
  `}
`;
