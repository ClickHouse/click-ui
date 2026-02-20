import { HTMLAttributes, ReactNode } from 'react';
import type { HorizontalDirection } from '@/components/types';
import type { ImageName } from '@/components/Icon/types';

export interface SelectGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'heading'
> {
  heading: ReactNode;
  value?: never;
  onSelect?: never;
}

export interface SelectOptionItem extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  description?: ReactNode;
  value: string;
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  disabled?: boolean;
}

export interface AutoCompleteProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onSelect'
> {
  children?: ReactNode;
  options?: Array<SelectOptionItem>;
  onSelect?: (value: string) => void;
}
