import styled from "styled-components";

export type TextColor = "default" | "muted";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface TextProps {
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  children?: React.ReactNode;
}

/** Component for writing blocks of body copy */
export const Text = ({ color, size, weight, children }: TextProps) => (
  <CuiText
    color={color}
    size={size}
    weight={weight}
  >
    {children}
  </CuiText>
);

const CuiText = styled.p<Pick<TextProps, "color" | "size" | "weight">>`
  font: ${({ size = "md", weight = "normal", theme }) =>
    theme.typography.styles.product.text[weight][size]};
  color: ${({ color = "default", theme }) => theme.click.global.color.text[color]};
  margin: 0;
`;
