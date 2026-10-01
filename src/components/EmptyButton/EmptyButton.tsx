import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cva';
import styles from './EmptyButton.module.css';

export const EmptyButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className={cn(styles['empty-button'], className)}
  />
));

EmptyButton.displayName = 'EmptyButton';
