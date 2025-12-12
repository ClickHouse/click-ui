import { Icon, IconName } from "@/components";
import { styled } from "styled-components";
import { BaseButton } from "../commonElement";
import React from "react";

export type ButtonType = "primary" | "secondary" | "empty" | "danger";
type Alignment = "center" | "left";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  type?: ButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The text label to display in the button */
  label?: string;
  /** Icon to display on the left side of the label */
  iconLeft?: IconName;
  /** Icon to display on the right side of the label */
  iconRight?: IconName;
  /** Alignment of the button content */
  align?: Alignment;
  /** Whether the button should fill the full width of its container */
  fillWidth?: boolean;
  /** Whether to show a loading spinner */
  loading?: boolean;
  /** Whether the button should be focused on mount */
  autoFocus?: boolean;
  /** Whether to show the label alongside the loading spinner */
  showLabelWithLoading?: boolean;
}

export const Button = ({
  type = "primary",
  iconLeft,
  iconRight,
  align = "center",
  children,
  fillWidth,
  label,
  loading = false,
  disabled,
  showLabelWithLoading = false,
  ...delegated
}: ButtonProps) => (
  <StyledButton
    $styleType={type}
    $align={align}
    $fillWidth={fillWidth}
    disabled={disabled || loading}
    aria-disabled={disabled || loading}
    role="button"
    {...delegated}
  >
    {!loading && (
      <>
        {iconLeft && (
          <ButtonIcon
            name={iconLeft}
            aria-hidden
            size="sm"
          />
        )}

        {label ?? children}

        {iconRight && (
          <ButtonIcon
            name={iconRight}
            aria-hidden
            size="sm"
          />
        )}
      </>
    )}
    {loading && (
      <LoadingIconWrapper data-testid="click-ui-loading-icon-wrapper">
        <Icon
          name="loading-animated"
          data-testid="click-ui-loading-icon"
          aria-label="loading"
        ></Icon>
        {showLabelWithLoading ? (label ?? children) : ""}
      </LoadingIconWrapper>
    )}
  </StyledButton>
);

const LoadingIconWrapper = styled.div`
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled(BaseButton)<{
  $styleType: ButtonType;
  $align?: Alignment;
  $fillWidth?: boolean;
}>`
  width: ${({ $fillWidth }) => ($fillWidth ? "100%" : "revert")};
  color: ${({ $styleType = "primary", theme }) =>
    theme.click.button.basic.color[$styleType].text.default};
  background-color: ${({ $styleType = "primary", theme }) =>
    theme.click.button.basic.color[$styleType].background.default};
  border: ${({ theme }) => theme.click.button.stroke} solid
    ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].stroke.default};
  font: ${({ theme }) => theme.click.button.basic.typography.label.default};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => ($align === "left" ? "flex-start" : "center")};
  white-space: nowrap;

  &:hover {
    background-color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].background.hover};
    border: ${({ theme }) => theme.click.button.stroke} solid
      ${({ $styleType = "primary", theme }) =>
        theme.click.button.basic.color[$styleType].stroke.hover};
    transition: ${({ theme }) => theme.transition.default};
    font: ${({ theme }) => theme.click.button.basic.typography.label.hover};
  }

  &:active,
  &:focus {
    background-color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].background.active};
    border: 1px solid
      ${({ $styleType = "primary", theme }) =>
        theme.click.button.basic.color[$styleType].stroke.active};
    font: ${({ theme }) => theme.click.button.basic.typography.label.active};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    background-color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].background.disabled};
    color: ${({ $styleType = "primary", theme }) =>
      theme.click.button.basic.color[$styleType].text.disabled};
    border: ${({ theme }) => theme.click.button.stroke} solid
      ${({ $styleType = "primary", theme }) =>
        theme.click.button.basic.color[$styleType].stroke.disabled};
    font: ${({ theme }) => theme.click.button.basic.typography.label.disabled};
  }
`;

const ButtonIcon = styled(Icon)`
  height: ${({ theme }) => theme.click.button.basic.size.icon.all};
  width: ${({ theme }) => theme.click.button.basic.size.icon.all};
  svg {
    height: ${({ theme }) => theme.click.button.basic.size.icon.all};
    width: ${({ theme }) => theme.click.button.basic.size.icon.all};
  }
`;
