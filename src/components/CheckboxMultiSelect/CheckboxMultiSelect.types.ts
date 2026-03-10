import type { ReactNode } from 'react';
import type { MultiSelectProps } from '../MultiSelect/MultiSelect.types';

export interface CheckboxMultiSelectProps extends MultiSelectProps {
  selectLabel?: string;
}
export interface Props extends Omit<CheckboxMultiSelectProps, 'children' | 'label'> {
  nodata?: ReactNode;
  showSearch?: boolean;
}
