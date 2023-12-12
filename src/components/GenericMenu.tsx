import styled from "styled-components";

export const GenericMenuPanel = styled.div<{
  $type: "popover" | "dropdown-menu" | "context-menu";
  $showArrow?: boolean;
}>`
  outline: none;
  max-width: var(--radix-${({ $type }) => $type}-content-available-width);
  max-height: var(--radix-${({ $type }) => $type}-content-available-height);
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  pointer-events: auto;

  ${({ theme }) => `
    border: 1px solid ${theme.click.genericMenu.panel.color.stroke.default};
    background: ${theme.click.genericMenu.panel.color.background.default};
    box-shadow: ${theme.click.genericMenu.panel.shadow.default};
    border-radius: ${theme.click.genericMenu.panel.radii.all};
  `};
  ${({ $showArrow }) =>
    $showArrow
      ? `
      &[data-side="bottom"] {
        margin-top: -1px;
      }
      &[data-side="top"] {
        margin-bottom: 1px;
      }
      &[data-side="left"] {
        margin-right: -1px;
      }
      }
      &[data-side="right"] {
        margin-left: -1px;
      }
  `
      : ""};
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

export const GenericMenuItem = styled.div`
  display: flex;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    padding: ${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x};
    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.item.typography.label.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    color: ${theme.click.genericMenu.item.color.text.default};
    &[data-highlighted] {
      font: ${theme.click.genericMenu.item.typography.label.hover};
      background: ${theme.click.genericMenu.item.color.background.hover};
      color:${theme.click.genericMenu.item.color.text.hover};
      cursor: pointer;
    }
    &[data-state="open"], &[data-state="checked"], &[data-selected="true"]  {
      background:${theme.click.genericMenu.item.color.background.active};
      color:${theme.click.genericMenu.item.color.text.active};
      font: ${theme.click.genericMenu.item.typography.label.active};
    }
    &[data-disabled] {
      background:${theme.click.genericMenu.item.color.background.disabled};
      color:${theme.click.genericMenu.item.color.text.disabled};
      font: ${theme.click.genericMenu.item.typography.label.disabled};
      pointer-events: none;
    }
    &:visited {
      color: ${theme.click.genericMenu.item.color.text.default};
    }
  `};
  position: relative;
  &:hover .dropdown-arrow,
  &[data-state="open"] .dropdown-arrow {
    left: 0.5rem;
  }
  &[hidden] {
    display: none;
  }
`;
