import { HTMLAttributes, ReactNode } from 'react';

type DialogPrimaryAction = 'primary' | 'danger';

export interface ConfirmationDialogProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  message?: string;
  onCancel?: () => void;
  onConfirm?: (() => void) | (() => Promise<void>);
  open?: boolean;
  primaryActionLabel?: string;
  primaryActionType?: DialogPrimaryAction;
  secondaryActionLabel?: string;
  showClose?: boolean;
  title: string;
}
