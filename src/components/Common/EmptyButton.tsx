import { styled } from 'styled-components';

export const EmptyButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  border: 0;
  color: inherit;
  font: inherit;
  &:disabled {
    cursor: not-allowed;
  }
`;
