import {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  forwardRef,
  ReactNode,
  useMemo,
} from 'react';
import { cn } from '@/lib/cva';
import type { GridContainerProps } from './GridContainer.types';
import styles from './GridContainer.module.css';

type GridContainerPolymorphicComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentProps<T>, keyof GridContainerProps<T>> & GridContainerProps<T>
) => ReactNode;

const _GridContainer = <T extends ElementType = 'div'>(
  {
    alignItems = 'stretch',
    alignContent = 'stretch',
    children,
    columnGap,
    gap,
    gridAutoColumns,
    gridAutoFlow,
    gridAutoRows,
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplate,
    inline = false,
    isResponsive = true,
    justifyContent = 'stretch',
    justifyItems = 'stretch',
    rowGap,
    height,
    maxHeight,
    minHeight,
    fillWidth = true,
    maxWidth,
    minWidth,
    overflow,
    component,
    className,
    style,
    ...props
  }: Omit<ComponentProps<T>, keyof GridContainerProps<T>> & GridContainerProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'div';

  // `_GridContainer` is a real component (wrapped by `forwardRef` below); the
  // rules-of-hooks PascalCase-name heuristic false-positives on our
  // `_`-prefixed polymorphic-component naming convention.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mergedStyle = useMemo(
    () =>
      ({
        '--grid-container-display': inline === true ? 'inline-grid' : 'grid',
        '--grid-container-align-items': alignItems,
        '--grid-container-align-content': alignContent,
        '--grid-container-justify-content': justifyContent,
        '--grid-container-justify-items': justifyItems,
        '--grid-container-width': fillWidth ? '100%' : 'auto',
        ...(gap && {
          '--grid-container-gap': `var(--click-gridContainer-gap-${gap})`,
        }),
        ...(columnGap && {
          columnGap: `var(--click-gridContainer-gap-${columnGap})`,
        }),
        ...(rowGap && {
          rowGap: `var(--click-gridContainer-gap-${rowGap})`,
        }),
        ...(gridAutoColumns && {
          '--grid-container-auto-columns': gridAutoColumns,
        }),
        ...(gridAutoFlow && { '--grid-container-auto-flow': gridAutoFlow }),
        ...(gridAutoRows && { '--grid-container-auto-rows': gridAutoRows }),
        ...(gridTemplateAreas && {
          '--grid-container-template-area': gridTemplateAreas,
        }),
        ...(gridTemplateColumns && {
          '--grid-container-template-columns': gridTemplateColumns,
        }),
        ...(gridTemplateRows && {
          '--grid-container-template-rows': gridTemplateRows,
        }),
        ...(gridTemplate && { gridTemplate }),
        ...(typeof maxWidth === 'string' && {
          '--grid-container-max-width': maxWidth,
        }),
        ...(typeof minWidth === 'string' && {
          '--grid-container-min-width': minWidth,
        }),
        ...(typeof height === 'string' && {
          '--grid-container-height': height,
        }),
        ...(typeof maxHeight === 'string' && {
          '--grid-container-max-height': maxHeight,
        }),
        ...(typeof minHeight === 'string' && {
          '--grid-container-min-height': minHeight,
        }),
        ...(typeof overflow === 'string' && {
          '--grid-container-overflow': overflow,
        }),
        ...style,
      }) as CSSProperties,
    [
      inline,
      alignItems,
      alignContent,
      justifyContent,
      justifyItems,
      fillWidth,
      gap,
      columnGap,
      rowGap,
      gridAutoColumns,
      gridAutoFlow,
      gridAutoRows,
      gridTemplateAreas,
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplate,
      maxWidth,
      minWidth,
      height,
      maxHeight,
      minHeight,
      overflow,
      style,
    ]
  );

  return (
    <Component
      data-testid="grid-container"
      ref={ref}
      {...props}
      style={mergedStyle}
      className={cn(
        styles['grid-container'],
        isResponsive
          ? styles['grid-container_responsive']
          : styles['grid-container_not-responsive'],
        className
      )}
    >
      {children}
    </Component>
  );
};

export const GridContainer: GridContainerPolymorphicComponent =
  forwardRef(_GridContainer);
