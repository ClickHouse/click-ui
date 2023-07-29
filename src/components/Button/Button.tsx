import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import styled from "styled-components";

type ButtonType = "primary" | "secondary" | "danger";
type ButtonState = "default" | "hover" | "active" | "disabled";
type Alignment = "default" | "left";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  state?: ButtonState;
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
  state?: ButtonState;
}

export const Button = ({
  type = "primary",
  state = "default",
  iconLeft,
  iconRight,
  label,
  align,
  children,
  ...delegated
}: ButtonProps) => (
  <StyledButton styleType={type} state={state} align={align} {...delegated}>
    {iconLeft && <Icon name={iconLeft} size="small" />}
    {label ? label : children}
    {iconRight && <Icon name={iconRight} size="small" />}
  </StyledButton>
);

const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${props => props.theme.click.button.basic.space.y} ${props => props.theme.click.button.basic.space.x};
  border-radius: ${props => props.theme.click.button.radii.all};
  gap: ${props => props.theme.click.button.basic.space.gap};
  cursor: pointer;
`;

const StyledButton = styled(BaseButton)<Pick<StyledButtonProps, "state" | "width" | "height" | "align" | "styleType" >>`
  width: ${props => props.width};
  height: ${props => props.height};
  font: ${props => props.theme.click.button.basic.typography.label.default};
  color: ${({ state = "default", styleType = "primary", theme }) => theme.click.button.basic.color[styleType].text[state]};
  background-color: ${({ state = "default", styleType = "primary", theme }) => theme.click.button.basic.color[styleType].background[state]};
  border: 1px solid ${({ state = "default", styleType = "primary", theme }) => theme.click.button.basic.color[styleType].stroke[state]};
  display: flex;
  align-items: ${({ align }) => align === "left" ? "left" : "center"};
  justify-content: ${props => props.align === "left" ? "flex-start" : "center"};

  &:hover {
    background-color: ${({ styleType = "primary", theme }) => theme.click.button.basic.color[styleType].background.hover};
    border: 1px solid ${({ styleType = "primary", theme }) => theme.click.button.basic.color[styleType].stroke.hover};
  }

  &:active {
    background-color: ${({ styleType = "primary", theme }) => theme.click.button.basic.color[styleType].background.active};
    border: 1px solid ${({ styleType = "primary", theme }) => theme.click.button.basic.color[styleType].stroke.active};
  }

  &:disabled, ,
  button[disabled] {
    &:hover {
      background-color: ${({ styleType = "primary", theme }) => theme.click.button.basic.color[styleType].background.disabled};
      border: 1px solid ${({ styleType = "primary", theme }) => theme.click.button.basic.color[styleType].stroke.disabled};
      cursor: not-allowed;
    }
  }
`;
