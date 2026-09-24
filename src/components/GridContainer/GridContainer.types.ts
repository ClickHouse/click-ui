import { ElementType } from 'react';

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
  /** Element or component to render instead of `div`. */
  component?: T;
  alignItems?: ItemsOptions;
  alignContent?: ContentOptions;
  /** Grid items. */
  children?: React.ReactNode;
  columnGap?: GapOptions;
  gap?: GapOptions;
  gridAutoColumns?: string;
  gridAutoFlow?: FlowOptions;
  gridAutoRows?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplate?: string;
  /** Uses `inline-grid` instead of `grid`. */
  inline?: boolean;
  /** Collapses to one column on screens up to 768px wide. */
  isResponsive?: boolean;
  justifyContent?: ContentOptions;
  justifyItems?: ItemsOptions;
  rowGap?: GapOptions;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  fillWidth?: boolean;
  maxWidth?: string;
  minWidth?: string;
  overflow?: string;
}
