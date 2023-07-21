import styled from "styled-components";
export const InputContainer = styled.div<{ error: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;

  span:first-of-type {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${({ theme, error }) => `
    border-radius: ${theme.click.field.radii.all};
    font: ${theme.click.field.typography["field-text"].default};
    color: ${theme.click.field.color.text.default};
    border: 1px solid ${theme.click.field.color.stroke.default};
    background: ${theme.click.field.color.background.default};
    &:hover {
      border: 1px solid ${theme.click.field.color.stroke.hover};
      background: ${theme.click.field.color.background.hover};
      color: ${theme.click.field.color.text.hover};
    }
    & > input {
      padding-top: ${theme.click.field.space.y};
      padding-bottom: ${theme.click.field.space.y};
      padding-left: ${theme.click.field.space.x};
    }
    ${
      error
        ? `
      font: ${theme.click.field.typography["field-text"].error};
      border: 1px solid ${theme.click.field.color.stroke.error};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.error};
      &:hover {
      border: 1px solid ${theme.click.field.color.stroke.error};
      color: ${theme.click.field.color.text.error};
      }
    `
        : `
    &:focus-within,
    &[data-state="open"] {
      font: ${theme.click.field.typography["field-text"].active};
      border: 1px solid ${theme.click.field.color.stroke.active};
      background: ${theme.click.field.color.background.active};
      color: ${theme.click.field.color.text.active};
      &~ label {
      color: ${theme.click.field.color.label.active};
      font: ${theme.click.field.typography.label.active};;
    }
    }
    `
    };
    &:disabled {
      font: ${theme.click.field.typography["field-text"].disabled};
      border: 1px solid ${theme.click.field.color.stroke.disabled};
      background: ${theme.click.field.color.background.disabled};
      color: ${theme.click.field.color.text.disabled};
    }
  `}
`;

export const InputElement = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: fill-available;
  color: inherit;
  font: inherit;
  ${({ theme }) => `
    &::placeholder {
      color: ${theme.click.field.color.placeholder.default};
    }
  `}
`;

export const IconButton = styled.button`
  background: transparent;
  color: inherit;
  border: none;
  padding: 0;
  outline: none;
  &:not(:disabled) {
    cursor: pointer;
  }
  ${({ theme }) => `
    &:first-of-type {
      padding-left: ${theme.click.field.space.gap};
    }
    &:last-of-type {
      padding-right: ${theme.click.field.space.x};
    }
  `}
`;
