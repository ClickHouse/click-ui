import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cva';
import { EmptyButton } from '@/components/EmptyButton';
import styles from './CrossButton.module.css';

export const CrossButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ type = 'button', className, ...props }, ref) => (
  <EmptyButton
    ref={ref}
    type={type}
    {...props}
    className={cn(styles['cross-button'], className)}
  />
));

CrossButton.displayName = 'CrossButton';
