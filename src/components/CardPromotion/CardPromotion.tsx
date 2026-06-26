import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import { cn } from '@/lib/cva';
import { CardPromotionProps } from './CardPromotion.types';
import styles from './CardPromotion.module.css';

export const CardPromotion = ({
  label,
  icon,
  dismissible = false,
  className,
  ...props
}: CardPromotionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className={styles.background}>
      <div
        {...props}
        className={cn(styles.wrapper, className)}
      >
        <Icon
          name={icon}
          aria-hidden
          className={styles.cardicon}
        />

        <Text>{label}</Text>

        {dismissible && (
          <button
            data-testid="click-alert-dismiss-button"
            onClick={() => setIsVisible(false)}
            className={styles.dismisswrapper}
          >
            <Icon
              name="cross"
              aria-label="close"
            />
          </button>
        )}
      </div>
    </div>
  ) : null;
};
