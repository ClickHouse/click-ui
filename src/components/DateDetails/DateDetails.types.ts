import { Dayjs } from 'dayjs';
import type { TextSize, TextWeight } from '@/components/Common';

export type ArrowPosition = 'left' | 'right' | 'center';

export interface DateDetailsProps {
  date: Dayjs | Date | string | number;
  side?: ArrowPosition;
  size?: TextSize;
  systemTimeZone?: string;
  weight?: TextWeight;
}
