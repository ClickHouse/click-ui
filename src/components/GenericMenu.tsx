import styled from "styled-components";

export const GenericMenuPanel = styled.div<{
  type: "popover" | "dropdown-menu" | "context-menu" | "hover-card";
}>`
  outline: none;
  max-width: var(--radix-${({ type }) => type}-content-available-width);
  max-height: var(--radix-${({ type }) => type}-content-available-height);
  overflow: hidden;
  display: flex;
  align-items: flex-start;

  ${({ theme }) => `
    border: 1px solid ${theme.click.genericMenu.panel.color.stroke.default};
    background: ${theme.click.genericMenu.panel.color.background.default};
    box-shadow: ${theme.click.genericMenu.panel.shadow.default};
    border-radius: ${theme.click.genericMenu.panel.radii.all};
  `}
`;

export const GenericPopoverMenuPanel = styled.div<{
  $type: "popover" | "hover-card";
  $showArrow?: boolean;
}>`
  outline: none;
  max-width: var(--radix-${({ $type }) => $type}-content-available-width);
  max-height: var(--radix-${({ $type }) => $type}-content-available-height);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;

  ${({ theme }) => `
    border: 1px solid ${theme.click.popover.color.panel.stroke.default};
    background: ${theme.click.popover.color.panel.background.default};
    padding: ${theme.click.popover.space.y} ${theme.click.popover.space.x};
    border-radius: ${theme.click.popover.radii.all};
    box-shadow: ${theme.click.popover.shadow.default};
  `}
  ${({ $showArrow }) => ($showArrow ? "margin: -1px 0;" : "")};
`;

export const Arrow = styled.svg`
  filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 4px 6px);
  ${({ theme }) => `
    fill: ${theme.click.genericMenu.panel.color.background.default};
    stroke: ${theme.click.genericMenu.panel.color.stroke.default};
  `};
`;
