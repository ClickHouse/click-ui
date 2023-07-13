import styled, { css } from "styled-components";

export const FormElement = css`
  display: flex;
  align-items: center;

  padding: 0.34375rem 0.75rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;

  ${({ theme }) => `
    font: ${theme.click.field.typography["field-text"].default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
    background: ${theme.click.field.color.background.hover};
    }
    &:focus,
    &[data-state="open"] {
      font: ${theme.click.field.typography["field-text"].active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
    }
    &.error {
      font: ${theme.click.field.typography["field-text"].error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
    }
    &:disabled,
    &.disabled {
      font: ${theme.click.field.typography["field-text"].disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
    }
  `}
`;

export const Label = styled.label<{ disabled?: boolean; error?: boolean }>`
  ${({ theme, disabled, error }) => `
    ${
      disabled
        ? `
    color: ${theme.click.field.color.label.disabled};
    font: ${theme.click.field.typography.label.disabled};
    `
        : error
        ? `
    color: ${theme.click.field.color.label.error};
    font: ${theme.click.field.typography.label.error};
    `
        : `
    color: ${theme.click.field.color.label.default};
    font: ${theme.click.field.typography.label.default};
    `
    };
  `}
`;

export const FormRoot = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: fill-available;
  align-items: flex-start;
  gap: 0.5rem;
  * {
    box-shadow: none;
    outline: none;
  }
`;

export const OptionContainer = css`
  display: flex;
  width: 100%;
  padding: 0.34375rem 0.75rem;
  align-items: center;
  gap: 0.5rem;
  &[aria-selected] {
    outline: none;
  }

  ${({ theme }) => `
    font: ${theme.click.contextMenu.typography.label.default};
    background: ${theme.click.contextMenu.color.background.default};
    color: ${theme.click.contextMenu.color.text.default};
    &[data-highlighted] {
      font: ${theme.click.field.typography.label.hover};
      background: ${theme.click.contextMenu.color.background.hover};
      color:${theme.click.contextMenu.color.text.hover};
    }
    &[data-state="checked"] {
      background:${theme.click.contextMenu.color.background.active};
      color:${theme.click.contextMenu.color.text.active};
      font: ${theme.click.field.typography.label.active};
    }
    &[data-disabled] {
      background:${theme.click.contextMenu.color.background.default};
      color:${theme.click.contextMenu.color.text.disabled};
      font: ${theme.click.field.typography.label.disabled};
      pointer-events: none;
    }
  `};
`;

export const Error = styled.div`
  ${({ theme }) => `
  font: ${theme.click.field.typography.label.error};
  color: ${theme.click.field.color.label.error};
`};
`;

export const ItemSeparator = css`
  height: 1px;
  background-color: ${({ theme }) => theme.click.contextMenu.stroke.default};
`;

export const MenuContent = css`
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  border-radius: 0.25rem;
  ${({ theme }) => `
  border: 1px solid ${theme.click.contextMenu.stroke.default};
  background: ${theme.click.contextMenu.color.background.default};
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

export const ScrollButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 25px;
  ${({ theme }) => `
      background-color: inherit;
      color: ${theme.click.contextMenu.color.text.default};
      &:hover {
        color: ${theme.click.contextMenu.color.text.hover};
        background: ${theme.click.contextMenu.color.background.hover};
      }
    `}
  cursor: default;
`;
