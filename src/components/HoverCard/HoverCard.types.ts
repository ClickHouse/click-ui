import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { ReactNode } from 'react';

export interface HoverCardContentProps extends RadixHoverCard.HoverCardContentProps {
  showArrow?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
  children: ReactNode;
}
