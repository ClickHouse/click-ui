import styled from "styled-components";

export interface SpacerProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const CUISpacer = styled.div<SpacerProps>`  
  ${({ theme, size }) => `
    background: transparent;
    display: flex;
    margin: ${theme.click.spacer.horizontal.space.y[size]} 0`
  }`

export const Spacer = ({ size = "sm"}: SpacerProps) => (
  <CUISpacer size={size} />
);
