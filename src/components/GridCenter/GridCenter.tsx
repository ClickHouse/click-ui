import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cva';
import styles from './GridCenter.module.css';

export const GridCenter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(styles['grid-center'], className)}
    />
  )
);

GridCenter.displayName = 'GridCenter';
