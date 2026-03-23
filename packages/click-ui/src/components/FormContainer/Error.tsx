import { styled } from 'styled-components';

export const Error = styled.div`
  ${({ theme }) => `
  font: ${theme.click.field.typography.label.error};
  color: ${theme.click.field.color.label.error};
`};
`;
