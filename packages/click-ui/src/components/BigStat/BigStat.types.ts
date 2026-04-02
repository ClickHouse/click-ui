import { HTMLAttributes } from 'react';

export type bigStatOrder = 'titleTop' | 'titleBottom';
export type bigStatSize = 'sm' | 'lg';
export type bigStatSpacing = 'sm' | 'lg';
export type bigStatState = 'default' | 'muted';

export interface BigStatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  fillWidth?: boolean;
  maxWidth?: string;
  height?: string;
  label: React.ReactNode;
  order?: bigStatOrder;
  size?: bigStatSize;
  spacing?: bigStatSpacing;
  state?: bigStatState;
  title: React.ReactNode;
  error?: boolean;
}
