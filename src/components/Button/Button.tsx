import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import styled from "styled-components";

type ButtonType = "primary" | "secondary";
type Alignment = "left";
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  align?: Alignment;
  width?: string;
  height?: string;
}

export interface StyledButtonProps {
  styleType: ButtonType;
  align?: Alignment;
  width?: string;
  height?: string;
}

export const Button = ({
  type = "primary",
  iconLeft,
  iconRight,
  label,
  align,
  children,
  ...delegated
}: ButtonProps) => (
  <StyledButton
    styleType={type}
    align={align}
    {...delegated}
  >
    {iconLeft && (
      <Icon
        name={iconLeft}
        size="small"
      />
    )}
    {label ? label : children}
    {iconRight && (
      <Icon
        name={iconRight}
        size="small"
      />
    )}
  </StyledButton>
);

const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-left: ${props => props.theme.click.button.basic.space.x};
  padding-right: ${props => props.theme.click.button.basic.space.x};
  padding-top: ${props => props.theme.click.button.basic.space.y};
  padding-bottom: ${props => props.theme.click.button.basic.space.y};
  border-radius: ${props => props.theme.click.button.radii.all};
  gap: ${props => props.theme.click.button.basic.space.gap};
  cursor: pointer;
`;

const StyledButton = styled(BaseButton)<StyledButtonProps>`
  width: ${props => props.width};
  height: ${props => props.height};

  display: flex;
  align-items: center;
  justify-content: ${props => (props.align === "left" ? "flex-start" : "center")};

  border: 1px solid
    ${props => props.theme.click.button.basic.color[props.styleType].stroke.default};
  background-color: ${props =>
    props.theme.click.button.basic.color[props.styleType].background.default};
  color: ${props => props.theme.click.button.basic.color[props.styleType].text.default};
  font: ${props => props.theme.click.button.basic.typography.label.default};

  &:active {
    border: 1px solid
      ${props => props.theme.click.button.basic.color[props.styleType].stroke.active};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.active};
    font: ${props => props.theme.click.button.basic.typography.label.active};
  }

  &:hover {
    border: 1px solid
      ${props => props.theme.click.button.basic.color[props.styleType].stroke.hover};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.hover};
    font: ${props => props.theme.click.button.basic.typography.label.hover};
  }

  &[disabled] {
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.disabled};
    color: ${props =>
      props.theme.click.button.basic.color[props.styleType].text.disabled};
  }
`;
