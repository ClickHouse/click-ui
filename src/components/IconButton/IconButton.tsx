import { forwardRef } from 'react';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.css';

const iconButtonVariants = cva(styles.iconbutton, {
  variants: {
    type: {
      primary: styles['iconbutton_type_primary'],
      secondary: styles['iconbutton_type_secondary'],
      ghost: styles['iconbutton_type_ghost'],
      danger: styles['iconbutton_type_danger'],
      info: styles['iconbutton_type_info'],
    },
    size: {
      default: '',
      sm: styles['iconbutton_size_sm'],
      xs: styles['iconbutton_size_xs'],
    },
  },
  defaultVariants: {
    type: 'primary',
    size: 'default',
  },
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = 'primary', htmlType, icon, size, disabled, className, ...props }, ref) => {
    const iconName = icon ? icon.toString() : 'unknown icon';

    return (
      <button
        {...props}
        type={htmlType}
        className={cn(iconButtonVariants({ type, size }), className)}
        disabled={disabled}
        ref={ref}
        role="button"
        aria-label={props['aria-label'] ?? iconName}
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
