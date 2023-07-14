import styled, { css } from "styled-components";

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
