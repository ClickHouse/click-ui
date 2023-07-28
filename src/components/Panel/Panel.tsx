import styled from "styled-components";

export type panelPadding = "sm" | "md" | "lg" | "xl";
export type panelColor = "default" | "muted" | "transparent";

export interface panelProps {
  hasBorder?: boolean;
	hasShadow?: boolean;
	color?: panelColor;
  padding?: panelPadding;
	children?: React.ReactNode;
}

export const Panel = ({
  hasBorder,
	hasShadow,
	color,
	padding,
	children
}: panelProps) => (
  <Wrapper hasBorder={hasBorder} hasShadow={hasShadow} color={color} padding={padding}>
		{children}
	</Wrapper>
);

const Wrapper = styled.div<panelProps>`
  background-color: ${({ color = "default", theme }) => theme.click.panel.color.background[color]};
  border-radius: ${({ theme }) => theme.click.panel.radii.all};
  padding: ${({ padding = "md", theme }) => theme.click.panel.space.y[padding]};
	border: ${({ hasBorder, theme }) => hasBorder === true ? theme.click.panel.stroke.default : "none"};
	box-shadow: ${({ hasShadow, theme }) => hasShadow === true ? theme.shadow[1] : "none"};
  display: flex;
`;