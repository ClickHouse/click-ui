import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cva';
import styles from './BaseButton.module.css';

export const BaseButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className={cn(styles['base-button'], className)}
  />
));

BaseButton.displayName = 'BaseButton';
