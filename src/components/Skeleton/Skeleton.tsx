import { cn, cva } from '@/lib/cva';
import { CSSProperties, forwardRef, useLayoutEffect, useMemo, useRef } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';
import styles from './Skeleton.module.css';
import { SkeletonLength, SkeletonProps, SkeletonSpace } from './Skeleton.types';

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

const spaceTokens: Record<SkeletonSpace, string> = {
  none: 'var(--spaces-0)',
  xxs: 'var(--spaces-1)',
  xs: 'var(--spaces-2)',
  sm: 'var(--spaces-3)',
  md: 'var(--spaces-4)',
  lg: 'var(--spaces-5)',
  xl: 'var(--spaces-6)',
  xxl: 'var(--spaces-8)',
};

const isSpace = (value: string): value is SkeletonSpace => value in spaceTokens;

const toCssLength = (value: SkeletonLength) =>
  isSpace(value) ? spaceTokens[value] : value;

/**
 * Decorative placeholder shown while content loads: lines of text, or a rectangle. Always hidden
 * from assistive technology; mark the loading area with `aria-busy` instead.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { shape = 'text', size, lines = 1, width, height, className, style, ...delegated },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMemo(() => mergeRefs([elementRef, ref]), [ref]);

    // CSS animations start when their element mounts. Pin every sweep to the document timeline's
    // origin, so a skeleton mounted later is in phase with the ones already on the page.
    useLayoutEffect(() => {
      elementRef.current?.getAnimations?.({ subtree: true }).forEach(animation => {
        animation.startTime = 0;
      });
    }, [shape, lines]);

    const skeletonStyle = useMemo(
      () =>
        ({
          ...(width ? { '--skeleton-width': toCssLength(width) } : {}),
          ...(height ? { '--skeleton-height': toCssLength(height) } : {}),
          ...style,
        }) as CSSProperties,
      [width, height, style]
    );

    return (
      <div
        ref={mergedRef}
        {...delegated}
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
