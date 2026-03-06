import { Dayjs } from 'dayjs';
import type { TextSize, TextWeight } from '@/components/Typography';

export type ArrowPosition = 'top' | 'right' | 'bottom' | 'left';

export interface DateDetailsProps {
  date: Dayjs | Date | string | number;
  side?: ArrowPosition;
  size?: TextSize;
  systemTimeZone?: string;
  weight?: TextWeight;
}
