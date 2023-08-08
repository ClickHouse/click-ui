import styled, { css } from "styled-components";

export const FormRoot = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
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
  background-color: ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

export const EmptyButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
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
