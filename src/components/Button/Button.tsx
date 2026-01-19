import { Icon, IconName } from "@/components";
import { styled, keyframes } from "styled-components";
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
  /** Whether to show a loading state */
  loading?: boolean;
  /** Whether the button should be focused on mount */
  autoFocus?: boolean;
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
  ...delegated
}: ButtonProps) => (
  <StyledButton
    $styleType={type}
    $align={align}
    $fillWidth={fillWidth}
    $loading={loading}
    disabled={disabled || loading}
    aria-disabled={disabled || loading}
    role="button"
    data-fill-width={fillWidth}
    {...delegated}
  >
    {iconLeft && (
      <ButtonIcon
        name={iconLeft}
        aria-hidden
        size="sm"
      />
    )}

    <span>{label ?? children}</span>

    {iconRight && (
      <ButtonIcon
        name={iconRight}
        aria-hidden
        size="sm"
      />
    )}
  </StyledButton>
);

const shimmerFullWidth = keyframes({
  "0%": {
    backgroundPosition: "100% 0",
  },
  "100%": {
    backgroundPosition: "-100% 0",
  },
});

const shimmerFixedWidth = keyframes({
  "0%": {
    backgroundPosition: "-200px 0",
  },
  "100%": {
    backgroundPosition: "200px 0",
  },
});

const StyledButton = styled(BaseButton)<{
  $styleType: ButtonType;
  $align?: Alignment;
  $fillWidth?: boolean;
  $loading?: boolean;
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
  overflow: hidden;
  flex-shrink: 0;

  &::before {
    content: ${({ $loading }) => ($loading ? '""' : "none")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: ${({ $styleType, theme }) =>
      theme.click.button.basic.color[$styleType].background.loading};
    background-size: ${({ $fillWidth }) => ($fillWidth ? "200% 100%" : "200px 100%")};
    background-repeat: ${({ $fillWidth }) => ($fillWidth ? "repeat" : "no-repeat")};
  }

  &[data-fill-width="true"]::before {
    animation: ${shimmerFullWidth} 1.5s ease-in-out infinite;
  }

  &[data-fill-width="false"]::before,
  &:not([data-fill-width])::before {
    animation: ${shimmerFixedWidth} 1.5s ease-in-out infinite;
  }

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

  ${({ $loading, $styleType, theme }) => {
    if ($loading) {
      return "";
    }

    const bgDisabled = theme.click.button.basic.color[$styleType].background.disabled;
    const textDisabled = theme.click.button.basic.color[$styleType].text.disabled;
    const strokeDisabled = theme.click.button.basic.color[$styleType].stroke.disabled;
    const stroke = theme.click.button.stroke;
    const fontDisabled = theme.click.button.basic.typography.label.disabled;

    return `
      &:disabled,
      &:disabled:hover,
      &:disabled:active {
        background-color: ${bgDisabled};
        color: ${textDisabled};
        border: ${stroke} solid ${strokeDisabled};
        font: ${fontDisabled};
        cursor: not-allowed;
      }
    `;
  }}

  /* Loading state styling */
  ${({ $loading, $styleType }) => {
    if (!$loading) {
      return "";
    }

    const btnOpacity = $styleType === "empty" ? 0.9 : 0.7;

    return `
      cursor: not-allowed;
      opacity: ${btnOpacity};

      /* Dim text and icons */
      > * {
        opacity: 0.7;
      }
    `;
  }}
`;

const ButtonIcon = styled(Icon)`
  height: ${({ theme }) => theme.click.button.basic.size.icon.all};
  width: ${({ theme }) => theme.click.button.basic.size.icon.all};
  svg {
    height: ${({ theme }) => theme.click.button.basic.size.icon.all};
    width: ${({ theme }) => theme.click.button.basic.size.icon.all};
  }
`;
