import { CardPrimaryTopBadge } from './CardPrimaryTopBadge';
import { ComponentType, FC } from 'react';
import styles from './CardPrimaryTopBadge.module.css';

export interface WithTopBadgeProps {
  topBadgeText?: string;
  isSelected?: boolean;
}

export const withTopBadge =
  <P extends object>(Component: ComponentType<P>): FC<P & WithTopBadgeProps> =>
  ({ topBadgeText, ...props }: P & WithTopBadgeProps) => {
    return (
      <div className={styles['top-badge-wrapper']}>
        <Component {...(props as P)} />
        {topBadgeText && (
          <CardPrimaryTopBadge
            data-testid="card-top-badge"
            text={topBadgeText}
            isSelected={props.isSelected || false}
          />
        )}
      </div>
    );
  };
