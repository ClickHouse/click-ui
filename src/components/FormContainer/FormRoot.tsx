import { HTMLAttributes } from 'react';
import { cn, cva } from '@/lib/cva';
import styles from './FormRoot.module.css';

const formRootVariants = cva(styles['form-root'], {
  variants: {
    direction: {
      'column-reverse': styles['form-root_direction_column-reverse'],
      column: styles['form-root_direction_column'],
      'row-reverse': styles['form-root_direction_row-reverse'],
      row: styles['form-root_direction_row'],
    },
    addLabelPadding: {
      true: styles['form-root_add-label-padding'],
      false: '',
    },
  },
  defaultVariants: {
    direction: 'column-reverse',
    addLabelPadding: false,
  },
});

export interface FormRootProps extends HTMLAttributes<HTMLDivElement> {
  $orientation?: 'horizontal' | 'vertical';
  $dir?: 'start' | 'end';
  $addLabelPadding?: boolean;
}

const getDirection = (
  orientation: 'horizontal' | 'vertical',
  dir: 'start' | 'end'
): 'column-reverse' | 'column' | 'row-reverse' | 'row' =>
  orientation === 'horizontal'
    ? dir === 'start'
      ? 'row-reverse'
      : 'row'
    : dir === 'start'
      ? 'column-reverse'
      : 'column';

export const FormRoot = ({
  $orientation = 'vertical',
  $dir = 'start',
  $addLabelPadding = false,
  className,
  ...props
}: FormRootProps) => (
  <div
    {...props}
    className={cn(
      formRootVariants({
        direction: getDirection($orientation, $dir),
        addLabelPadding: $addLabelPadding && $orientation === 'horizontal',
      }),
      className
    )}
  />
);
