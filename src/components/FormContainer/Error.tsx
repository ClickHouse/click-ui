import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cva';
import styles from './FormContainer.module.css';

export const Error = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(styles.error, className)}
  />
);
