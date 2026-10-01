import * as RadixAccordion from '@radix-ui/react-accordion';
import { GapOptions } from '@/components/Container';

export type Size = 'none' | 'sm' | 'md' | 'lg';
export type Color = 'default' | 'link';

export type MarkAsCompletedFunctionType = (value: string) => void | Promise<void>;

interface MultiAccordionCommonProps {
  /** `MultiAccordion.Item` elements. */
  children: React.ReactNode;
  size?: Size;
  fillWidth?: boolean;
  /** Space between items. */
  gap?: GapOptions;
  /** Shows a border around each item. */
  showBorder?: boolean;
  /** Shows a completion check on each item. */
  showCheck?: boolean;
  /** Called with an item's `value` when its check is clicked. */
  markAsCompleted?: MarkAsCompletedFunctionType;
}

export type MultiAccordionProps = MultiAccordionCommonProps &
  (
    | Omit<RadixAccordion.AccordionMultipleProps, 'children'>
    | Omit<RadixAccordion.AccordionSingleProps, 'children'>
  );
