import { Icon } from "@/components";
import { IconName, IconSize } from "@/components/Icon/types";
import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: IconSize;
  disabled?: boolean;
  type?: "primary" | "secondary";
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "primary", icon, size = "medium", ...props }, ref) => {
    return (
      <Button
        {...props}
        $styleType={type}
        ref={ref}
      >
        <Icon
          name={icon}
          size={size}
        />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

const Button = styled.button<
  Partial<{
    $styleType?: "primary" | "secondary";
  }>
>`
  border-radius: ${props => props.theme.click.button.iconButton.radii.all};
  border-color: ${props =>
    props.theme.click.button.iconButton.color.primary.stroke.default};
  padding: ${props =>
    `${props.theme.click.button.iconButton.default.space.y} ${props.theme.click.button.iconButton.default.space.x}`};

  background-color: ${props =>
    props.$styleType === "primary"
      ? props.theme.click.button.iconButton.color.primary.background.default
      : props.theme.click.button.iconButton.color.secondary.background.default};

  color: ${props =>
    props.$styleType === "primary"
      ? props.theme.click.button.iconButton.color.primary.text.default
      : props.theme.click.button.iconButton.color.secondary.text.default};

  &:hover {
    background-color: ${props =>
      props.$styleType === "primary"
        ? props.theme.click.button.iconButton.color.primary.background.hover
        : props.theme.click.button.iconButton.color.secondary.background.hover};
    color: ${props =>
      props.$styleType === "primary"
        ? props.theme.click.button.iconButton.color.primary.text.hover
        : props.theme.click.button.iconButton.color.secondary.text.hover};
  }

  &:active {
    background-color: ${props =>
      props.$styleType === "primary"
        ? props.theme.click.button.iconButton.color.primary.background.active
        : props.theme.click.button.iconButton.color.secondary.background.active};
    color: ${props =>
      props.$styleType === "primary"
        ? props.theme.click.button.iconButton.color.primary.text.default
        : props.theme.click.button.iconButton.color.secondary.text.default};
  }

  &[disabled] {
    background-color: ${props =>
      props.theme.click.button.iconButton.color.disabled.background.default};
    color: ${props => props.theme.click.button.iconButton.color.disabled.text.default};
  }
`;
