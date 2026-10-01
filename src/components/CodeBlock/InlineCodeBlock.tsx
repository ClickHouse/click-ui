import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cva';
import styles from './InlineCodeBlock.module.css';

export const InlineCodeBlock = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    {...props}
    className={cn(styles.inline, className)}
  />
);
