import { cn, cva } from '@/lib/cva';
import { CSSProperties, forwardRef, useMemo } from 'react';
import styles from './Skeleton.module.css';
import { SkeletonProps } from './Skeleton.types';

const skeletonVariants = cva(styles.skeleton, {
  variants: {
    size: {
      sm: styles.skeleton_size_sm,
      md: styles.skeleton_size_md,
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * Decorative placeholder shown while content loads. It is hidden from assistive technology:
 * announce the loading state on the container instead, for example with `aria-busy`.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ size = 'md', width, height, className, style, ...delegated }, ref) => {
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
        aria-hidden="true"
        data-skeleton
        {...delegated}
        style={skeletonStyle}
        className={cn(skeletonVariants({ size }), className)}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
