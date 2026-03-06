import { styled } from 'styled-components';
import { SpacerProps, SizeType } from './Spacer.types';

const CUISpacer = styled.div<{
  $size?: SizeType;
}>`
  background: transparent;
  display: flex;
  padding: ${({ theme, $size = 'md' }) =>
    `${theme.click.spacer.horizontal.space.y[$size]} ${theme.click.spacer.horizontal.space.x.all}`};
`;

export const Spacer = ({ size }: SpacerProps) => <CUISpacer $size={size} />;
