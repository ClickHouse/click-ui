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
  tooltipProps,
  gap = 'sm',
  isResponsive = true,
  ...props
}: IconWrapperProps) => {
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
      {ellipsisContent ? (
        <EllipsisContent
          data-testid="ellipsed-icon-wrapper-text"
          tooltipProps={tooltipProps}
        >
          {children}
        </EllipsisContent>
      ) : (
        <div data-testid="normal-icon-wrapper-text">{children}</div>
      )}
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
