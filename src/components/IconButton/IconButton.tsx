import { forwardRef } from 'react';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.css';

const iconButtonVariants = cva(styles['icon-button'], {
  variants: {
    type: {
      primary: styles['icon-button_primary'],
      secondary: styles['icon-button_secondary'],
      ghost: styles['icon-button_ghost'],
      danger: styles['icon-button_danger'],
      info: styles['icon-button_info'],
    },
    size: {
      default: undefined,
      sm: styles['icon-button_sm'],
      xs: styles['icon-button_xs'],
    },
  },
  defaultVariants: {
    type: 'primary',
    size: 'default',
  },
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = 'primary', icon, size = 'default', disabled, className, ...props }, ref) => {
    const iconName = icon ? icon.toString() : 'unknown icon';

    return (
      <button
        type="button"
        {...props}
        className={cn(iconButtonVariants({ type, size }), className)}
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        aria-label={iconName}
      >
        <Icon
          name={icon}
          size="sm"
        />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
