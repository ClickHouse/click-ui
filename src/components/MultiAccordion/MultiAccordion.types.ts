import * as RadixAccordion from '@radix-ui/react-accordion';
import { GapOptions } from '@/components/Container';

export type Size = 'none' | 'sm' | 'md' | 'lg';
export type Color = 'default' | 'link';

interface MultiAccordionCommonProps {
  children: React.ReactNode;
  size?: Size;
  fillWidth?: boolean;
  gap?: GapOptions;
  showBorder?: boolean;
  showCheck?: boolean;
  markAsCompleted?: (value: string) => void | Promise<void>;
}

export type MultiAccordionProps = MultiAccordionCommonProps &
  (
    | Omit<RadixAccordion.AccordionMultipleProps, 'children'>
    | Omit<RadixAccordion.AccordionSingleProps, 'children'>
  );
