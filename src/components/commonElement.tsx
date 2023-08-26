import styled, { css } from "styled-components";

export const FormRoot = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  align-items: flex-start;
  gap: ${({ theme }) => theme.click.field.space.gap};
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
  background-color: ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

export const EmptyButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  &:disabled {
    cursor: not-allowed;
  }
`;

export const GridCenter = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

export const BaseButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => `
    padding: ${theme.click.button.basic.space.y} ${theme.click.button.basic.space.x};
    border-radius: ${theme.click.button.radii.all};
    gap: ${theme.click.button.basic.space.gap};
    font: ${theme.click.button.basic.typography.label.default};
    &:hover {
      font: ${theme.click.button.basic.typography.label.hover};
    }

    &:active,
    &:focus {
      outline: none;
      font: ${theme.click.button.basic.typography.label.active};
    }

    &:disabled,
    &:disabled:hover,
    &:disabled:active {
      font: ${theme.click.button.basic.typography.label.disabled};
      cursor: not-allowed;
    }
    `}
`;