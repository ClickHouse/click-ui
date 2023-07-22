import styled from "styled-components";

export type TextColor = "default"|"muted";
export type TextSize = "xs"|"sm"|"md"|"lg";
export type TextWeight = "text"|"text-sbold"|"text-bold";

export interface TextProps {
  color?: TextColor;
  size?: TextSize;
	weight?: TextWeight;
	text: string;
}
export const Text = ({
  color = "default",
  size = "lg",
  weight = "text",
	text,
}: TextProps) => (
		<CuiText color={color} size={size} weight={weight}>
			{text}
		</CuiText>
);

const CuiText = styled.p<Pick<TextProps, "color"|"size"|"weight">>`
font: ${({ size = "md", weight = "text", theme }) => theme.typography.styles[weight][size]};
color: ${({ color = "default", theme }) => theme.click.global.color.text[color]};
margin: 0;
`
