import { Icon, IconName } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';
import { forwardRef } from 'react';
import styles from './Button.module.css';

export type ButtonType = 'primary' | 'secondary' | 'empty' | 'danger';
type Alignment = 'center' | 'left';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  // TODO: The type prop ('primary' | 'secondary' | 'empty' | 'danger') shadows the native <button type="submit|reset|button"> attribute. Since type is destructured before ...delegated, consumers can never pass type="submit" for form submission. Consider renaming the visual variant prop to variant (consistent with the CSS class names button--primary etc.). This is a public API problem!
  /** The visual style variant of the button */
  type?: ButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The text label to display in the button */
  label?: string;
  /** Icon to display on the left side of the label */
  iconLeft?: IconName;
  /** Icon to display on the right side of the label */
  iconRight?: IconName;
  /** Alignment of the button content */
  align?: Alignment;
  /** Whether the button should fill the full width of its container */
  fillWidth?: boolean;
  /** Whether to show a loading state */
  loading?: boolean;
  /** Whether the button should be focused on mount */
  autoFocus?: boolean;
}

const buttonVariants = cva(styles.button, {
  variants: {
    type: {
      primary: styles['button--primary'],
      secondary: styles['button--secondary'],
      empty: styles['button--empty'],
      danger: styles['button--danger'],
    },
    align: {
      center: styles['button--align-center'],
      left: styles['button--align-left'],
    },
    fillWidth: {
      true: styles['button--fill'],
    },
    loading: {
      true: styles['button--loading'],
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
      ref={ref}
      className={cn(buttonVariants({ type, align, fillWidth, loading }), className)}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
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
