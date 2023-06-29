import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import styled from "styled-components";

type ButtonType = "primary" | "secondary";

type Align = "left";
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  label?: string;
  align?: Align;
  iconLeft?: IconName;
  iconRight?: IconName;
}

export interface StyledButtonProps {
  styleType: ButtonType;
  align?: Align;
}

export const Button = ({
  type = "primary",
  iconLeft,
  iconRight,
  label,
  children,
  ...delegated
}: ButtonProps) => (
  <StyledButton styleType={type} {...delegated}>
    {iconLeft && <Icon name={iconLeft} size="small" />}
    {label ? label : children}
    {iconRight && <Icon name={iconRight} size="small" />}
  </StyledButton>
);

const BaseButton = styled.button<StyledButtonProps>`
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

// const ContentWrapper = styled.div<{ align?: Align }>`
//   gap: ${props => props.theme.click.button.basic.space.gap};
//   width: 100%;

//   display: flex;
//   justify-content: ${props => (props.align === "left" ? "start" : "center")};
// `;

const StyledButton = styled(BaseButton)`
  border: ${props =>
    props.theme.click.button.basic.color[props.styleType].stroke.default};
  background-color: ${props =>
    props.theme.click.button.basic.color[props.styleType].background.default};
  color: ${props =>
    props.theme.click.button.basic.color[props.styleType].text.default};
  font: ${props => props.theme.click.button.basic.typography.label.default};

  &:active {
    border: ${props =>
      props.theme.click.button.basic.color[props.styleType].stroke.active};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.active};
    font: ${props => props.theme.click.button.basic.typography.label.active};
  }

  &:hover {
    border: ${props =>
      props.theme.click.button.basic.color[props.styleType].stroke.hover};
    background-color: ${props =>
      props.theme.click.button.basic.color[props.styleType].background.hover};
    font: ${props => props.theme.click.button.basic.typography.label.hover};
  }

  &[disabled] {
    background-color: ${props =>
      props.theme.click.button.basic.color.disabled.background.default};
    color: ${props =>
      props.theme.click.button.basic.color.disabled.text.default};
  }
`;
