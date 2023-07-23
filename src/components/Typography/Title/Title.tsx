import styled from "styled-components";

export type TitleColor = "default"|"muted";
export type TitleSize = "xs"|"sm"|"md"|"lg"|"xl";
export type TitleType = "product"|"brand";

export interface TitleProps {
	color?: TitleColor;
	size?: TitleSize;
	type?: TitleType;
	text: string;
}
export const Title = ({
	size = "md",
	type = "product",
	color = "default",
	text,
}: TitleProps) => (
		<CuiTitle color={color} size={size} type={type}>
			{text}
		</CuiTitle>
);

const CuiTitle = styled.p<Pick<TitleProps, "color"|"size"|"type">>`
	font: ${({ size = "md", type = "product", theme }) => theme.typography.styles[type].titles[size]};
	color: ${({ color = "default", theme }) => theme.click.global.color.text[color]};
	margin: 0;
`
