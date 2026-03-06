import type { IconName } from '@/components/Icon';

export type ButtonType = 'primary' | 'secondary' | 'empty' | 'danger';
export type Alignment = 'center' | 'left';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  disabled?: boolean;
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  align?: Alignment;
  fillWidth?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
}
