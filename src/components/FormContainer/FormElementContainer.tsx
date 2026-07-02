import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cva';
import styles from './FormElementContainer.module.css';

export const FormElementContainer = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(styles['form-element-container'], className)}
  />
);
