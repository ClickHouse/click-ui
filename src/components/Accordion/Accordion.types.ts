import * as RadixAccordion from '@radix-ui/react-accordion';
import { ReactNode } from 'react';
import type { AssetSize } from '@/types';
import type { IconName } from '@/components/Icon';

export type Size = 'sm' | 'md' | 'lg';
export type Gap = 'sm' | 'md' | 'lg';
export type Color = 'default' | 'link';

interface SizeProp {
  size?: Size;
}

export interface AccordionProps
  extends
    SizeProp,
    Omit<RadixAccordion.AccordionSingleProps, 'type' | 'collapsible' | 'title'> {
  title: ReactNode;
  color?: Color;
  icon?: IconName;
  iconSize?: AssetSize;
  gap?: Gap;
  children: React.ReactNode;
  fillWidth?: boolean;
}
