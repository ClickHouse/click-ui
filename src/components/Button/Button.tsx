import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import styled from "styled-components";

type ButtonType = "primary" | "secondary" | "danger";
type Alignment = "center" | "left";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  disabled?: boolean;
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  align?: Alignment;
  width?: string;
  height?: string;
}

export interface StyledButtonProps {
  styleType: ButtonType;
  disabled?: boolean;
  align?: Alignment;
  width?: string;
  height?: string;
}

export const Button = ({
  type = "primary",
  iconLeft,
  iconRight,
  label,
  align = "center",
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
  padding: ${(props) => props.theme.click.button.basic.space.y}
    ${(props) => props.theme.click.button.basic.space.x};
  border-radius: ${(props) => props.theme.click.button.radii.all};
  gap: ${(props) => props.theme.click.button.basic.space.gap};
  cursor: pointer;
`;

const StyledButton = styled(BaseButton)<
  Pick<StyledButtonProps, "width" | "height" | "align" | "styleType">
>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font: ${(props) => props.theme.click.button.basic.typography.label.default};
  color: ${({ styleType = "primary", theme }) =>
    theme.click.button.basic.color[styleType].text.default};
  background-color: ${({ styleType = "primary", theme }) =>
    theme.click.button.basic.color[styleType].background.default};
  border: 1px solid
    ${({ styleType = "primary", theme }) =>
      theme.click.button.basic.color[styleType].stroke.default};
  display: flex;
  align-items: ${({ align }) => (align === "left" ? "left" : "center")};
  justify-content: ${(props) => (props.align === "left" ? "flex-start" : "center")};

  &:hover {
    background-color: ${({ styleType = "primary", theme }) =>
      theme.click.button.basic.color[styleType].background.hover};
    border: 1px solid
      ${({ styleType = "primary", theme }) =>
        theme.click.button.basic.color[styleType].stroke.hover};
  }

  &:active,
  &:focus {
    background-color: ${({ styleType = "primary", theme }) =>
      theme.click.button.basic.color[styleType].background.active};
    border: 1px solid
      ${({ styleType = "primary", theme }) =>
        theme.click.button.basic.color[styleType].stroke.active};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    background-color: ${({ styleType = "primary", theme }) =>
      theme.click.button.basic.color[styleType].background.disabled};
    color: ${({ styleType = "primary", theme }) =>
      theme.click.button.basic.color[styleType].text.disabled};
    border: 1px solid
      ${({ styleType = "primary", theme }) =>
        theme.click.button.basic.color[styleType].stroke.disabled};
    cursor: not-allowed;
  }
`;
