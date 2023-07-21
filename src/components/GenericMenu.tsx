import styled from "styled-components";

export const GenericMenuPanel = styled.div<{
  type: "popover" | "dropdown-menu" | "context-menu";
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

export const Arrow = styled.svg`
  ${({ theme }) => `
    fill: ${theme.click.genericMenu.panel.color.background.default};
    stroke: ${theme.click.genericMenu.panel.color.stroke.default};
  `}
`;
