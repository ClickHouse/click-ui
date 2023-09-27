import { HTMLAttributes } from "react";
import styled from "styled-components";

export type PanelPadding = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type PanelColor = "default" | "muted" | "transparent";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  hasBorder?: boolean;
  hasShadow?: boolean;
  color?: PanelColor;
  padding?: PanelPadding;
  children?: React.ReactNode;
}

export const Panel = ({ hasBorder, hasShadow, color, padding, children }: PanelProps) => (
  <FlexContainer>
    <Wrapper
      $hasBorder={hasBorder}
      $hasShadow={hasShadow}
      $color={color}
      $padding={padding}
    >
      {children}
    </Wrapper>
  </FlexContainer>
);

const Wrapper = styled.div<{
  $hasBorder?: boolean;
  $hasShadow?: boolean;
  $color?: PanelColor;
  $padding?: PanelPadding;
}>`
  background-color: ${({ $color = "default", theme }) =>
    theme.click.panel.color.background[$color]};
  border-radius: ${({ theme }) => theme.click.panel.radii.all};
  padding: ${({ $padding = "md", theme }) => theme.click.panel.space.y[$padding]};
  border: ${({ $hasBorder, theme }) =>
    $hasBorder ? `1px solid ${theme.click.global.color.stroke.default}` : "none"};
  box-shadow: ${({ $hasShadow, theme }) => ($hasShadow ? theme.shadow[1] : "none")};
  display: flex;
`;

const FlexContainer = styled.div`
  display: flex;
`;
