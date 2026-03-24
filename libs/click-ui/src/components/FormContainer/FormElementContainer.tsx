import { styled } from 'styled-components';

export const FormElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  gap: ${({ theme }) => theme.click.field.space.gap};
`;
