import { styled } from 'styled-components';
import { EmptyButton } from '@/components/EmptyButton';

export const CrossButton = styled(EmptyButton)`
  padding: ${({ theme }) => theme.click.button.iconButton.sm.space.y}
    ${({ theme }) => theme.click.button.iconButton.sm.space.x};
  background: ${({ theme }) =>
    theme.click.button.iconButton.color.primary.background.default};
  border-radius: ${({ theme }) => theme.click.button.iconButton.radii.all};

  &:hover {
    background: ${({ theme }) =>
      theme.click.button.iconButton.color.primary.background.hover};
  }
`;
