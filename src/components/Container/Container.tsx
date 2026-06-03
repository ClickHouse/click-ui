import {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { ContainerProps } from './Container.types';
import styles from './Container.module.css';

const containerVariants = cva(styles.container, {
  variants: {
    gap: {
      none: styles.container_gap_none,
      xxs: styles.container_gap_xxs,
      xs: styles.container_gap_xs,
      sm: styles.container_gap_sm,
      md: styles.container_gap_md,
      lg: styles.container_gap_lg,
      xl: styles.container_gap_xl,
      xxl: styles.container_gap_xxl,
    },
    padding: {
      none: styles.container_padding_none,
      xxs: styles.container_padding_xxs,
      xs: styles.container_padding_xs,
      sm: styles.container_padding_sm,
      md: styles.container_padding_md,
      lg: styles.container_padding_lg,
      xl: styles.container_padding_xl,
      xxl: styles.container_padding_xxl,
    },
    orientation: {
      horizontal: styles.container_orientation_horizontal,
      vertical: styles.container_orientation_vertical,
    },
    wrap: {
      nowrap: styles.container_wrap_nowrap,
      wrap: styles.container_wrap_wrap,
      'wrap-reverse': styles['container_wrap_wrap-reverse'],
    },
    alignItems: {
      start: styles['container_align-items_start'],
      center: styles['container_align-items_center'],
      end: styles['container_align-items_end'],
      stretch: styles['container_align-items_stretch'],
    },
    justifyContent: {
      center: styles['container_justify-content_center'],
      'space-between': styles['container_justify-content_space-between'],
      'space-around': styles['container_justify-content_space-around'],
      'space-evenly': styles['container_justify-content_space-evenly'],
      start: styles['container_justify-content_start'],
      end: styles['container_justify-content_end'],
      left: styles['container_justify-content_left'],
      right: styles['container_justify-content_right'],
    },
  },
});

type ContainerPolymorphicComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentProps<T>, keyof ContainerProps<T>> & ContainerProps<T>
) => ReactNode;

const _Container = <T extends ElementType = 'div'>(
  {
    component,
    alignItems,
    children,
    fillWidth = true,
    gap = 'none',
    grow,
    shrink,
    isResponsive = true,
    justifyContent = 'start',
    maxWidth,
    minWidth,
    orientation = 'horizontal',
    padding = 'none',
    wrap = 'nowrap',
    fillHeight,
    maxHeight,
    minHeight,
    overflow,
    display = 'flex',
    className,
    style,
    ...props
  }: Omit<ComponentProps<T>, keyof ContainerProps<T>> & ContainerProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'div';
  const resolvedAlignItems =
    alignItems ?? (orientation === 'vertical' ? 'start' : 'center');

  // `_Container` is a real component (wrapped by `forwardRef` below); the
  // rules-of-hooks PascalCase-name heuristic false-positives on our
  // `_`-prefixed polymorphic-component naming convention.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mergedStyle = useMemo(
    () =>
      ({
        '--container-display': display,
        '--container-width': fillWidth === true ? '100%' : 'auto',
        '--container-min-width': minWidth ?? 'auto',
        '--container-max-width': maxWidth ?? 'none',
        ...(grow && { '--container-grow': grow }),
        ...(shrink && { '--container-shrink': shrink }),
        ...(fillHeight && { '--container-height': '100%' }),
        ...(maxHeight && { '--container-max-height': maxHeight }),
        ...(minHeight && { '--container-min-height': minHeight }),
        ...(overflow && { '--container-overflow': overflow }),
        ...style,
      }) as CSSProperties,
    [
      display,
      fillWidth,
      minWidth,
      maxWidth,
      grow,
      shrink,
      fillHeight,
      maxHeight,
      minHeight,
      overflow,
      style,
    ]
  );

  return (
    <Component
      ref={ref}
      data-testid="container"
      {...props}
      style={mergedStyle}
      className={cn(
        containerVariants({
          gap,
          padding,
          orientation,
          wrap,
          alignItems: resolvedAlignItems,
          justifyContent,
        }),
        isResponsive
          ? styles.container_responsive
          : fillWidth
            ? styles['container_non-responsive_fill']
            : styles['container_non-responsive_hug'],
        className
      )}
    >
      {children}
    </Component>
  );
};

export const Container: ContainerPolymorphicComponent = forwardRef(_Container);
