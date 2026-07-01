import { CSSProperties, useMemo } from 'react';
import { cn, cva } from '@/lib/cva';
import { BigStatProps } from './BigStat.types';
import styles from './BigStat.module.css';

const wrapperVariants = cva(styles['big-stat'], {
  variants: {
    state: {
      default: styles['big-stat_state_default'],
      muted: styles['big-stat_state_muted'],
    },
    size: {
      lg: styles['big-stat_size_lg'],
      sm: styles['big-stat_size_sm'],
    },
    spacing: {
      sm: styles['big-stat_spacing_sm'],
      lg: styles['big-stat_spacing_lg'],
    },
    order: {
      titleTop: styles['big-stat_order_title-top'],
      titleBottom: styles['big-stat_order_title-bottom'],
    },
    fillWidth: {
      true: styles['big-stat_fill-width'],
    },
    error: {
      true: styles['big-stat_error'],
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'lg',
    spacing: 'sm',
    order: 'titleTop',
  },
});

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  fillWidth = false,
  maxWidth,
  height = '6rem',
  label = 'Label',
  order = 'titleTop',
  size = 'lg',
  spacing = 'sm',
  state = 'default',
  title = 'Title',
  error = false,
  className,
  style,
  ...props
}: BigStatProps) => {
  const mergedStyle = useMemo(
    () =>
      ({
        '--big-stat-height': height,
        ...(maxWidth && { '--big-stat-max-width': maxWidth }),
        ...style,
      }) as CSSProperties,
    [height, maxWidth, style]
  );

  return (
    <div
      style={mergedStyle}
      {...props}
      className={cn(
        wrapperVariants({ state, size, spacing, order, fillWidth, error }),
        className
      )}
    >
      <div className={cn(styles['big-stat__label'])}>{label}</div>
      <div className={cn(styles['big-stat__title'])}>{title}</div>
    </div>
  );
};
