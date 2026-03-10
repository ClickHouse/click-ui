import type { ReactNode } from 'react';
import type { MultiSelectProps } from '@/components/MultiSelect';

export interface CheckboxMultiSelectProps extends MultiSelectProps {
  selectLabel?: string;
}
export interface Props extends Omit<CheckboxMultiSelectProps, 'children' | 'label'> {
  nodata?: ReactNode;
  showSearch?: boolean;
}
