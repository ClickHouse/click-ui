import styled from "styled-components";

export type TextColor = "default" | "muted";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold" | "mono";

export interface TextProps {
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  children?: React.ReactNode;
}

/** Component for writing blocks of body copy */
const _Text = ({ color, size, weight, className, children, ...props }: TextProps) => (
  <CuiText
    $color={color}
    $size={size}
    $weight={weight}
    className={className}
    {...props}
  >
    {children}
  </CuiText>
);

const CuiText = styled.p<{ $color?: TextColor; $size?: TextSize; $weight?: TextWeight }>`
  font: ${({ $size = "md", $weight = "normal", theme }) =>
    theme.typography.styles.product.text[$weight][$size]};
  color: ${({ $color = "default", theme }) => theme.click.global.color.text[$color]};
  margin: 0;
`;

const Text = styled(_Text)``;
Text.displayName = "Text";

export { Text };
