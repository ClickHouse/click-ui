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
import styles from './GridContainer.module.css';

export type FlowOptions = 'row' | 'column' | 'row-dense' | 'column-dense';
type GapOptions = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'unset';
type ItemsOptions = 'start' | 'center' | 'end' | 'stretch';
type ContentOptions =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'stretch'
  | 'end'
  | 'left'
  | 'right';

export interface GridContainerProps<T extends ElementType = 'div'> {
  /** Custom component to render as */
  component?: T;
  /** Alignment of items along the block axis */
  alignItems?: ItemsOptions;
  /** Alignment of content along the block axis */
  alignContent?: ContentOptions;
  /** The content to display inside the grid container */
  children?: React.ReactNode;
  /** Gap between columns */
  columnGap?: GapOptions;
  /** Gap between rows and columns */
  gap?: GapOptions;
  /** Size of implicitly-created grid columns */
  gridAutoColumns?: string;
  /** How auto-placed items flow into the grid */
  gridAutoFlow?: FlowOptions;
  /** Size of implicitly-created grid rows */
  gridAutoRows?: string;
  /** Named grid areas */
  gridTemplateAreas?: string;
  /** Column track sizes */
  gridTemplateColumns?: string;
  /** Row track sizes */
  gridTemplateRows?: string;
  /** Shorthand for grid-template-rows, grid-template-columns, and grid-template-areas */
  gridTemplate?: string;
  /** Whether to use inline-grid instead of grid */
  inline?: boolean;
  /** Whether to collapse to single column on smaller screens */
  isResponsive?: boolean;
  /** Alignment of content along the inline axis */
  justifyContent?: ContentOptions;
  /** Alignment of items along the inline axis */
  justifyItems?: ItemsOptions;
  /** Gap between rows */
  rowGap?: GapOptions;
  /** Height of the container */
  height?: string;
  /** Maximum height of the container */
  maxHeight?: string;
  /** Minimum height of the container */
  minHeight?: string;
  /** Whether the container should fill the full width of its parent */
  fillWidth?: boolean;
  /** Maximum width of the container */
  maxWidth?: string;
  /** Minimum width of the container */
  minWidth?: string;
  /** CSS overflow behavior */
  overflow?: string;
}

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
        isResponsive && styles['grid-container_responsive'],
        className
      )}
    >
      {children}
    </Component>
  );
};

export const GridContainer: GridContainerPolymorphicComponent =
  forwardRef(_GridContainer);
