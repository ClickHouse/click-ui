import { Badge } from '@/components/Badge';
import { cn } from '@/lib/cva';
import styles from './CardPrimaryTopBadge.module.css';

interface CardPrimaryTopBadgeProps {
  text: string;
  isSelected?: boolean;
  'data-testid'?: string;
}

export const CardPrimaryTopBadge = ({
  text,
  isSelected,
  'data-testid': dataTestId,
}: CardPrimaryTopBadgeProps) => {
  return (
    <Badge
      text={text}
      className={cn(
        styles['card-primary-top-badge'],
        isSelected && styles['card-primary-top-badge_is-selected']
      )}
      data-testid={dataTestId}
    />
  );
};
