import { cn, cva } from '@/lib/cva';
import { GenericLabelProps } from './GenericLabel.types';
import styles from './GenericLabel.module.css';

const genericLabelVariants = cva(styles['generic-label'], {
  variants: {
    disabled: {
      true: styles['generic-label_disabled'],
    },
  },
});

export const GenericLabel = ({
  disabled,
  children,
  className,
  ...props
}: GenericLabelProps) => (
  <label
    {...props}
    className={cn(genericLabelVariants({ disabled }), className)}
  >
    {children}
  </label>
);
