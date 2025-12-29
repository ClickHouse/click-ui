import { Icon, IconName } from "@/components";
import { styled, keyframes, css } from "styled-components";
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
    {...delegated}
  >
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
  </StyledButton>
);

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

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

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-size: 200% 100%;
    opacity: 0;
  }

  ${({ $loading, $styleType, theme }) => {
    if (!$loading) return "";

    const bgHover = theme.click.button.basic.color[$styleType].background.hover;

    const shimmerGradient = `linear-gradient(
      90deg,
      ${bgHover} 0%,
      transparent 50%,
      ${bgHover} 100%
    )`;

    return css`
      &::before {
        background: ${shimmerGradient};
        background-size: 200% 100%;
        animation: ${shimmer} 1.5s ease-in-out infinite;
        opacity: 1;
      }
    `;
  }}

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
    if ($loading) return "";

    const bgDisabled = theme.click.button.basic.color[$styleType].background.disabled;
    const textDisabled = theme.click.button.basic.color[$styleType].text.disabled;
    const strokeDisabled = theme.click.button.basic.color[$styleType].stroke.disabled;
    const stroke = theme.click.button.stroke;
    const fontDisabled = theme.click.button.basic.typography.label.disabled;
    const isPrimary = $styleType === "primary";

    return css`
      &:disabled,
      &:disabled:hover,
      &:disabled:active {
        background-color: ${bgDisabled};
        color: ${textDisabled};
        border: ${stroke} solid ${strokeDisabled};
        font: ${fontDisabled};
        cursor: not-allowed;
        ${isPrimary ? "opacity: 0.6;" : ""}
      }
    `;
  }}

  /* Loading state styling */
  ${({ $loading, $styleType }) => {
    if (!$loading) return "";

    if ($styleType === "primary") {
      // Primary: 60% opacity + shimmer animation
      return css`
        cursor: not-allowed;

        &::before {
          opacity: 0.6;
        }
      `;
    } else if ($styleType === "secondary" || $styleType === "empty") {
      // Secondary & Empty: Full opacity during loading, shimmer only, text dimmed (70%)
      return css`
        cursor: not-allowed;

        &::before {
          opacity: 0.7;
        }
      `;
    } else if ($styleType === "danger") {
      // Destructive: Full opacity during loading, shimmer only, text dimmed (70%)
      return css`
        cursor: not-allowed;

        &::before {
          opacity: 0.7;
        }
      `;
    }

    return "";
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
