import { cn, cva } from '@/lib/cva';
import { CSSProperties, forwardRef, useMemo } from 'react';
import styles from './Skeleton.module.css';
import { SkeletonProps } from './Skeleton.types';

const skeletonVariants = cva(styles.skeleton, {
  variants: {
    shape: {
      text: styles.skeleton_shape_text,
      rectangle: styles.skeleton_shape_rectangle,
    },
    size: {
      sm: styles.skeleton_size_sm,
      md: styles.skeleton_size_md,
    },
  },
});

/**
 * Decorative placeholder shown while content loads: lines of text, or a rectangle. Always hidden
 * from assistive technology; mark the loading area with `aria-busy` instead.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { shape = 'text', size, lines = 1, width, height, className, style, ...props },
    ref
  ) => {
    const skeletonStyle = useMemo(
      () =>
        ({
          ...(width ? { '--skeleton-width': width } : {}),
          ...(height ? { '--skeleton-height': height } : {}),
          ...style,
        }) as CSSProperties,
      [width, height, style]
    );

    return (
      <div
        ref={ref}
        {...props}
        aria-hidden="true"
        style={skeletonStyle}
        className={cn(
          skeletonVariants({
            shape,
            size: shape === 'text' ? (size ?? 'md') : undefined,
          }),
          className
        )}
      >
        {shape === 'text' &&
          Array.from({ length: Math.max(1, lines) }, (_, index) => (
            <div
              key={index}
              className={styles.skeleton__line}
            />
          ))}
      </div>
    );
  }
);
Skeleton.displayName = 'Skeleton';
