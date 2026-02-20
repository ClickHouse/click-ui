import { GapOptions } from '@/components/Container';

export type Size = 'none' | 'sm' | 'md' | 'lg';
export type Color = 'default' | 'link';

export interface MultiAccordionProps {
  children: React.ReactNode;
  size?: Size;
  fillWidth?: boolean;
  gap?: GapOptions;
  showBorder?: boolean;
  showCheck?: boolean;
  markAsCompleted?: (value: string) => void | Promise<void>;
}
