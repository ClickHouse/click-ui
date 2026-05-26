import { Badge, BadgeProps } from '@/components/Badge';
import { Container, ContainerProps } from '@/components/Container';
import { cn } from '@/lib/cva';
import { HTMLAttributes } from 'react';
import styles from './CardPrimary.module.css';

type TopBadgeWrapperProps = ContainerProps<'div'> & HTMLAttributes<HTMLDivElement>;

export const TopBadgeWrapper = ({ className, ...props }: TopBadgeWrapperProps) => (
  <Container
    className={cn(styles.topbadgewrapper, className)}
    {...props}
  />
);

type CardPrimaryTopBadgeProps = BadgeProps & { isSelected?: boolean };

export const CardPrimaryTopBadge = ({
  isSelected,
  className,
  ...props
}: CardPrimaryTopBadgeProps) => (
  <Badge
    className={cn(styles.topbadge, isSelected && styles['topbadge_selected'], className)}
    {...props}
  />
);
