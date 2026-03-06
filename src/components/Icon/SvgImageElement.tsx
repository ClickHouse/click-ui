import { styled } from 'styled-components';
import type { IconSize } from '@/types';

export const SvgImageElement = styled.svg<{
  $size?: IconSize;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $size }) => `
      ${
        $size
          ? `
        width: ${theme.click.image[$size].size.width};
        height: ${theme.click.image[$size].size.height};
      `
          : ''
      }
  `}
`;
