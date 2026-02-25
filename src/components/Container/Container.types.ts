import { ElementType } from 'react';
import type { Orientation } from '@/types';

type AlignItemsOptions = 'start' | 'center' | 'end' | 'stretch';
export type GapOptions = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type GrowShrinkOptions = '0' | '1' | '2' | '3' | '4' | '5' | '6';
type JustifyContentOptions =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right';
export type PaddingOptions = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type WrapOptions = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface ContainerProps<T extends ElementType = 'div'> {
  component?: T;
  alignItems?: AlignItemsOptions;
  children?: React.ReactNode;
  fillWidth?: boolean;
  gap?: GapOptions;
  grow?: GrowShrinkOptions;
  shrink?: GrowShrinkOptions;
  justifyContent?: JustifyContentOptions;
  orientation?: Orientation;
  padding?: PaddingOptions;
  wrap?: WrapOptions;
  isResponsive?: boolean;
  maxWidth?: string;
  minWidth?: string;
  fillHeight?: boolean;
  maxHeight?: string;
  minHeight?: string;
  overflow?: string;
  display?: string;
  isOverflowScroll?: boolean;
}
