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

export const Button = ({
  type = "primary",
  iconLeft,
  iconRight,
  label,
  align = "center",
  children,
  width,
  height,
  ...delegated
}: ButtonProps) => (
  <StyledButton
    $styleType={type}
    $align={align}
    $width={width}
    $height={height}
    {...delegated}
  >
    {iconLeft && (
      <ButtonIcon
        name={iconLeft}
        size="sm"
      />
    )}
    {label ? label : children}
    {iconRight && (
      <ButtonIcon
        name={iconRight}
        size="sm"
      />
    )}
  </StyledButton>
);

export const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => `
    padding: ${theme.click.button.basic.space.y} ${theme.click.button.basic.space.x};
    border-radius: ${theme.click.button.radii.all};
    gap: ${theme.click.button.basic.space.gap};
    font: ${theme.click.button.basic.typography.label.default};
    &:hover {
      font: ${theme.click.button.basic.typography.label.hover};
    }

    &:active,
    &:focus {
      outline: none;
      font: ${theme.click.button.basic.typography.label.active};
    }

    &:disabled,
    &:disabled:hover,
    &:disabled:active {
      font: ${theme.click.button.basic.typography.label.disabled};
      cursor: not-allowed;
    }
    `}
`;

const StyledButton = styled(BaseButton)<{
  $styleType: ButtonType;
  $align?: Alignment;
  $width?: string;
  $height?: string;
}>`
  ${({ $width }) => ($width ? `width: ${$width};` : "")}
  ${({ $height }) => ($height ? `height: ${$height};` : "")}
  color: ${({ $styleType = "primary", theme }) =>
    theme.click.button.basic.color[$styleType].text.default};
  background-color: ${({ $styleType = "primary", theme }) =>
    theme.click.button.basic.color[$styleType].background.default};
  border: 1px solid
    ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].stroke.default};

  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => ($align === "left" ? "flex-start" : "center")};

  &:hover {
    background-color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].background.hover};
    border: 1px solid
      ${({ $styleType = "primary", theme }) =>
        theme.click.button.basic.color[$styleType].stroke.hover};
    transition: ${({ theme }) => theme.transition.default};
  }

  &:active,
  &:focus {
    background-color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].background.active};
    border: 1px solid
      ${({ $styleType = "primary", theme }) =>
        theme.click.button.basic.color[$styleType].stroke.active};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    background-color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].background.disabled};
    color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].text.disabled};
    border: 1px solid
      ${({ $styleType = "primary", theme }) =>
        theme.click.button.basic.color[$styleType].stroke.disabled};
  }
`;

const ButtonIcon = styled(Icon)`
  height: ${({ theme }) => theme.click.button.basic.size.icon.height};
  width: ${({ theme }) => theme.click.button.basic.size.icon.height};
`;
