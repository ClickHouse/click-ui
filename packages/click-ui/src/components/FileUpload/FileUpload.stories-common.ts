import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`;
