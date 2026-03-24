import { styled } from 'styled-components';
import type { AssetSize } from '@/types';

export const SvgImageElement = styled.svg<{
  $size?: AssetSize;
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
