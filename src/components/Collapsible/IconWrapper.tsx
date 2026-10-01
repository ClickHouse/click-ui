import { ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import type { HorizontalDirection } from '@/types';
import type { ImageName } from '@/components/Icon';

import { cn } from '@/lib/cva';
import styles from './Collapsible.module.css';

export const IconWrapper = ({
  icon,
  iconDir = 'start',
  children,
}: {
  // TODO: The consumer app seem to expect to use other assets
  // this needs to be investigated why it had type IconName
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  children: ReactNode;
}) => {
  return (
    <span className={cn(styles.collapsible__label)}>
      {icon && iconDir === 'start' && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
      <span className={cn(styles.collapsible__ellipsis)}>{children}</span>
      {icon && iconDir === 'end' && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
    </span>
  );
};
