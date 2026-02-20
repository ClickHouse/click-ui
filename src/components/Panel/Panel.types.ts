import type { CursorOptions } from '@/components/Common';
import type { Orientation } from '@/components/types';
import { HTMLAttributes, ReactNode } from 'react';

export type PanelPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PanelColor = 'default' | 'muted' | 'transparent';
export type PanelRadii = 'none' | 'sm' | 'md' | 'lg';

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
