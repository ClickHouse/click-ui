import { styled } from 'styled-components';

export const EllipsisContainer = styled.span`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  justify-content: flex-end;
  gap: inherit;
  & > *:not(button) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
