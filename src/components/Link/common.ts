import { css } from "styled-components";

export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export type StyledLinkProps = {
  $disabled?: boolean;
  $size: TextSize;
  $weight: TextWeight;
};

export const linkStyles = css<StyledLinkProps>`
  font: ${({ $size, $weight = "normal", theme }) =>
    theme.typography.styles.product.text[$weight][$size]};
  color: ${({ $disabled, theme }) => {
    if ($disabled) {
      return theme.click.global.color.text.muted;
    }

    return theme.click.global.color.text.link.default;
  }};
  margin: 0;
  text-decoration: none;
  display: inline-flex;
  gap: ${({ $size, theme }) =>
    $size === "xs" || $size === "sm"
      ? theme.click.link.space.sm.gap
      : theme.click.link.space.md.gap};
  margin-right: ${({ $size, theme }) =>
    $size === "xs" || $size === "sm"
      ? theme.click.link.space.sm.gap
      : theme.click.link.space.md.gap};
  align-items: center;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.click.global.color.text.link.hover};
    transition: ${({ theme }) => theme.transition.default};
    text-decoration: underline;
    cursor: pointer;
  }

  &:visited {
    color: ${({ theme }) => theme.click.global.color.text.link.default};
  }
`;
