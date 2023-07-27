import styled from "styled-components";

export interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const CUISpacer = styled.div<SpacerProps>` 
  background: transparent;
  display: flex;
  padding: ${({ theme, size = "md" }) => `${theme.click.spacer.horizontal.space.y[size]} ${theme.click.spacer.horizontal.space.x.all}`};
`

export const Spacer = ({ size }: SpacerProps) => (
  <CUISpacer size={size} />
);
