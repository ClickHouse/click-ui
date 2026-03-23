import type { Orientation } from '@/types';
import { HTMLAttributes, ReactNode } from 'react';

export type PanelPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PanelColor = 'default' | 'muted' | 'transparent';
export type PanelRadii = 'none' | 'sm' | 'md' | 'lg';

export type CursorOptions =
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'col-resize'
  | 'row-resize'
  | 'all-scroll'
  | 'zoom-in'
  | 'zoom-out';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  alignItems?: 'start' | 'center' | 'end';
  children?: ReactNode;
  color?: PanelColor;
  cursor?: CursorOptions;
  fillHeight?: boolean;
  fillWidth?: boolean;
  gap?: PanelPadding;
  hasBorder?: boolean;
  hasShadow?: boolean;
  height?: string;
  orientation?: Orientation;
  padding?: PanelPadding;
  radii?: PanelRadii;
  width?: string;
}
