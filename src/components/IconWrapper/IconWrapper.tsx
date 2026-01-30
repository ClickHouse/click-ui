import { ReactNode } from 'react';

import type { HorizontalDirection } from '@/components/types';
import type { IconName } from '@/components/Icon/types';
import { Container, GapOptions } from '@/components/Container/Container';
import { EllipsisContent } from '@/components/EllipsisContent/EllipsisContent';
import { Icon } from '@/components/Icon/Icon';
import { IconSize } from '@/components/Icon/types';

interface IconWrapperProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  size?: IconSize;
  width?: number | string;
  height?: number | string;
  children: ReactNode;
  ellipsisContent?: boolean;
  gap?: GapOptions;
}

export const IconWrapper = ({
  icon,
  iconDir = 'start',
  size = 'sm',
  width,
  height,
  children,
  ellipsisContent = true,
  gap = 'sm',
  ...props
}: IconWrapperProps) => {
  const TextWrapper = ellipsisContent ? EllipsisContent : 'div';
  return (
    <Container
      orientation="horizontal"
      gap={gap}
      overflow="hidden"
      {...props}
    >
      {icon && iconDir === 'start' && (
        <Icon
          name={icon}
          size={size}
          width={width}
          height={height}
        />
      )}
      <TextWrapper
        data-testid={`${ellipsisContent ? 'ellipsed' : 'normal'}-icon-wrapper-text`}
      >
        {children}
      </TextWrapper>
      {icon && iconDir === 'end' && (
        <Icon
          name={icon}
          size={size}
          width={width}
          height={height}
        />
      )}
    </Container>
  );
};
