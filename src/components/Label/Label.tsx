import { cn, cva } from '@/lib/cva';
import { LabelProps } from './Label.types';
import styles from './Label.module.css';

const labelVariants = cva(styles.label, {
  variants: {
    disabled: {
      true: styles['label_disabled'],
      false: '',
    },
    error: {
      true: styles['label_error'],
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
    error: false,
  },
});

export const Label = ({
  disabled,
  error,
  children,
  className,
  ...props
}: LabelProps) => (
  <label
    {...props}
    className={cn(labelVariants({ disabled, error }), className)}
  >
    {children}
  </label>
);
