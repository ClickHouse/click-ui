import { cn, cva } from '@/lib/cva';
import { AnimationEvent, CSSProperties, forwardRef, useCallback, useMemo } from 'react';
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

const isSpace = (value: string): value is SkeletonSpace =>
  Object.prototype.hasOwnProperty.call(spaceTokens, value);

const toCssLength = (value: SkeletonLength) =>
  isSpace(value) ? spaceTokens[value] : value;

// The keyframes in Skeleton.module.css; CSS Modules adds a hash suffix to the name.
const SHIMMER_ANIMATION = 'skeleton-shimmer';

const isShimmer = (animation: Animation, animationName: string): boolean =>
  'animationName' in animation && animation.animationName === animationName;

/**
 * Decorative placeholder shown while content loads: lines of text, or a rectangle. Always hidden
 * from assistive technology; mark the loading area with `aria-busy` instead.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      shape = 'text',
      size,
      lines = 1,
      width,
      height,
      className,
      style,
      onAnimationStart,
      ...delegated
    },
    ref
  ) => {
    // A CSS animation starts when it is created: on mount, but also when reduced motion is turned
    // off or a hidden parent is shown. Pin each shimmer to the document timeline's origin as it
    // starts, so every skeleton on the page sweeps in phase. Other animations are left alone.
    const handleAnimationStart = useCallback(
      (event: AnimationEvent<HTMLDivElement>) => {
        onAnimationStart?.(event);
        if (!event.animationName.startsWith(SHIMMER_ANIMATION)) {
          return;
        }
        (event.target as Element).getAnimations?.().forEach(animation => {
          if (isShimmer(animation, event.animationName)) {
            animation.startTime = 0;
          }
        });
      },
      [onAnimationStart]
    );

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
        ref={ref}
        {...delegated}
        aria-hidden="true"
        onAnimationStart={handleAnimationStart}
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
