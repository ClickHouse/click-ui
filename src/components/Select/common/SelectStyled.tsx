import { Content, Root, Trigger } from "@radix-ui/react-popover";
import styled from "styled-components";

export const SelectPopoverRoot = styled(Root)`
  width: 100%;
`;

export const SelectValue = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex: 1;
  gap: inherit;
  color: inherit;
  font: inherit;
`;

export const StyledSelectTrigger = styled(Trigger)<{ $error: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  span:first-of-type {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme, $error }) => `
    border-radius: ${theme.click.field.radii.all};
    padding: ${theme.click.field.space.y} ${theme.click.field.space.x};
    gap: ${theme.click.field.space.gap};
    font: ${theme.click.field.typography.fieldText.default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};
    }
    ${
      $error
        ? `
      font: ${theme.click.field.typography.fieldText.error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.error};
      &:hover {
      border: 1px solid ${theme.click.field.color.stroke.error};
      color: ${theme.click.field.color.text.error};
      }
    `
        : `
    &:focus,
    &[data-state="open"] {
      font: ${theme.click.field.typography.fieldText.active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};
      & ~ label {
        color: ${theme.click.field.color.label.active};
        font: ${theme.click.field.typography.label.active};;
      }
    }
    `
    };
    &:disabled {
      font: ${theme.click.field.typography.fieldText.disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};
      cursor: not-allowed;
    }
  `}
`;

export const SelectPopoverContent = styled(Content)`
  width: var(--radix-popover-trigger-width);
  max-height: var(--radix-popover-content-available-height);
  border-radius: 0.25rem;

  ${({ theme }) => `
    border: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
    background: ${theme.click.genericMenu.item.color.background.default};
    box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1),
      0px 1px 2px 0px rgba(16, 24, 40, 0.06);
    border-radius: 0.25rem;
  `}
  overflow: hidden;
  display: flex;
  padding: 0.5rem 0rem;
  align-items: flex-start;
  gap: 0.625rem;
`;

export const SearchBarContainer = styled.div<{ $showSearch: boolean }>`
  width: auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ theme, $showSearch }) => `
    padding: ${
      $showSearch
        ? `${theme.click.genericMenu.item.space.y} ${theme.click.genericMenu.item.space.x}`
        : 0
    };
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
    height: ${$showSearch ? "auto" : " 0"};
  `}
`;

export const SearchBar = styled.input<{ $showSearch: boolean }>`
  background: transparent;
  border: none;
  width: 100%;
  outline: none;
  ${({ theme, $showSearch }) => `
    min-height: ${$showSearch ? "21px" : 0};
    height: ${$showSearch ? "initial" : 0};
    ${$showSearch ? "padding-right: 24px" : "padding:0"};

    gap: ${theme.click.genericMenu.item.space.gap};
    font: ${theme.click.genericMenu.autocomplete.typography.search.term.default};
    border-bottom: ${
      $showSearch ? `2px solid ${theme.click.genericMenu.button.color.stroke.default}` : 0
    };
    color: ${theme.click.genericMenu.autocomplete.color.searchTerm.default};
    &::placeholder {
      color: ${theme.click.genericMenu.autocomplete.color.placeholder.default};
      font: ${theme.click.genericMenu.autocomplete.typography.search.placeholder.default};
    }
  `}
`;

export const SearchClose = styled.button<{ $showClose: boolean }>`
  position: absolute;
  ${({ theme }) => `
    top: ${theme.click.genericMenu.item.space.y};
    right: ${theme.click.genericMenu.item.space.x};
  `}
  visibility: ${({ $showClose }) => ($showClose ? "visible" : "hidden")};
`;

export const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  max-height: calc(var(--radix-popover-content-available-height) - 1rem);
`;
export const SelectListContent = styled.div`
  width: inherit;
  overflow: overlay;
  flex: 1;
`;

export const HiddenSelectElement = styled.select`
  visibility: hidden;
  position: absolute;
  z-index: -1;
  height: 0;
`;

export const SelectGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  overflow: hidden;
  background: transparent;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
    color: ${theme.click.genericMenu.item.color.text.muted};
  `};
  &[hidden] {
    display: none;
  }
`;

export const SelectGroupName = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme }) => `
     font: ${theme.click.genericMenu.item.typography.sectionHeader.default};
     color: ${theme.click.genericMenu.item.color.text.muted};
     padding: ${theme.click.genericMenu.sectionHeader.space.top} ${theme.click.genericMenu.item.space.x} ${theme.click.genericMenu.sectionHeader.space.bottom};
     gap: ${theme.click.genericMenu.item.space.gap};
     border-bottom: 1px solid ${theme.click.genericMenu.item.color.stroke.default};
   `}
`;

export const SelectGroupContent = styled.div`
  width: inherit;
`;

export const SelectNoDataContainer = styled.div<{ $clickable: boolean }>`
  border: none;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;

  &[hidden="true"] {
    display: none;
  }
  ${({ theme, $clickable }) => `
    font: ${theme.click.genericMenu.button.typography.label.default}
    padding: ${theme.click.genericMenu.button.space.y} ${
    theme.click.genericMenu.item.space.x
  };
    background: ${theme.click.genericMenu.button.color.background.default};
    color: ${theme.click.genericMenu.button.color.label.default};
    &:hover {
      font: ${theme.click.genericMenu.button.typography.label.hover};
    }
    cursor: ${$clickable ? "pointer" : "default"}
  `}
`;
