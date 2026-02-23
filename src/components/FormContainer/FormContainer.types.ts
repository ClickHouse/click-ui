import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection, Orientation } from '@/types';

export interface FormContainerProps extends HTMLAttributes<HTMLDivElement> {
  htmlFor: string;
  label?: ReactNode;
  orientation?: Orientation;
  dir?: HorizontalDirection;
  error?: ReactNode;
  children: ReactNode;
  addLabelPadding?: boolean;
}
