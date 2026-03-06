import { Container } from '@/components/Container';
import { EllipsisContent } from '@/components/EllipsisContent';
import { Icon } from '@/components/Icon';
import { IconWrapperProps } from './IconWrapper.types';

export const IconWrapper = ({
  icon,
  iconDir = 'start',
  size = 'sm',
  width,
  height,
  children,
  ellipsisContent = true,
  gap = 'sm',
  isResponsive = true,
  ...props
}: IconWrapperProps) => {
  const TextWrapper = ellipsisContent ? EllipsisContent : 'div';
  return (
    <Container
      orientation="horizontal"
      gap={gap}
      overflow="hidden"
      isResponsive={isResponsive}
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
