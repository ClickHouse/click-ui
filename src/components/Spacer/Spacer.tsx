import { cn, cva } from '@/lib/cva';
import { SpacerProps } from './Spacer.types';
import styles from './Spacer.module.css';

const spacerVariants = cva(styles.spacer, {
  variants: {
    size: {
      xs: styles['spacer_size_xs'],
      sm: styles['spacer_size_sm'],
      md: styles['spacer_size_md'],
      lg: styles['spacer_size_lg'],
      xl: styles['spacer_size_xl'],
      xxl: styles['spacer_size_xxl'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Spacer = ({ size }: SpacerProps) => (
  <div className={cn(spacerVariants({ size }))} />
);
