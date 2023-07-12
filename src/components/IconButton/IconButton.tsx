import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  display?: "empty" | "filled";
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ display = "filled", icon, size = "medium", ...props }, ref) => {
    return (
      <Button {...props} display={display} ref={ref}>
        <Icon name={icon} size={size} />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

const Button = styled.button<Partial<IconButtonProps>>`
  border-radius: ${props => props.theme.click.button.iconButton.radii.all};
  border-color: ${props =>
    props.theme.click.button.iconButton.color.primary.stroke.default};
  padding: ${props =>
    `${props.theme.click.button.iconButton.default.space.y} ${props.theme.click.button.iconButton.default.space.x}`};

  background-color: ${props =>
    props.display === "filled"
      ? props.theme.click.button.iconButton.color.secondary.background.default
      : props.theme.click.button.iconButton.color.primary.background.default};

  color: ${props =>
    props.display === "filled"
      ? props.theme.click.button.iconButton.color.secondary.text.default
      : props.theme.click.button.iconButton.color.primary.text.default};

  &:hover {
    background-color: ${props =>
      props.display === "filled"
        ? props.theme.click.button.iconButton.color.secondary.background.hover
        : props.theme.click.button.iconButton.color.primary.background.hover};
    color: ${props =>
      props.display === "filled"
        ? props.theme.click.button.iconButton.color.secondary.text.hover
        : props.theme.click.button.iconButton.color.primary.text.hover};
  }

  &:active {
    background-color: ${props =>
      props.display === "filled"
        ? props.theme.click.button.iconButton.color.secondary.background.active
        : props.theme.click.button.iconButton.color.primary.background.active};
    color: ${props =>
      props.display === "filled"
        ? props.theme.click.button.iconButton.color.secondary.text.default
        : props.theme.click.button.iconButton.color.primary.text.default};
  }

  &[disabled] {
    background-color: ${props =>
      props.theme.click.button.iconButton.color.disabled.background.default};
    color: ${props =>
      props.theme.click.button.iconButton.color.disabled.text.default};
  }
`;
