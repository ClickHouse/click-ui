import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { forwardRef } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

const buttonVariants = cva(styles.button, {
  variants: {
    type: {
      primary: styles['button_primary'],
      secondary: styles['button_secondary'],
      empty: styles['button_empty'],
      danger: styles['button_danger'],
    },
    align: {
      center: styles['button_align-center'],
      left: styles['button_align-left'],
    },
    fillWidth: {
      true: styles['button_fill_width'],
    },
    loading: {
      true: styles['button_loading'],
    },
  },
  defaultVariants: {
    type: 'primary',
    align: 'center',
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'primary',
      htmlType,
      iconLeft,
      iconRight,
      align = 'center',
      children,
      fillWidth,
      label,
      loading = false,
      disabled,
      className,
      ...delegated
    },
    ref
  ) => (
    <button
      type={htmlType}
      ref={ref}
      className={cn(buttonVariants({ type, align, fillWidth, loading }), className)}
      disabled={disabled || loading}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      {...delegated}
    >
      {iconLeft && (
        <span className={styles.button__icon}>
          <Icon
            name={iconLeft}
            aria-hidden
            size="sm"
          />
        </span>
      )}

      <span className={styles.button__label}>{label ?? children}</span>

      {iconRight && (
        <span className={styles.button__icon}>
          <Icon
            name={iconRight}
            aria-hidden
            size="sm"
          />
        </span>
      )}
    </button>
  )
);

Button.displayName = 'Button';
