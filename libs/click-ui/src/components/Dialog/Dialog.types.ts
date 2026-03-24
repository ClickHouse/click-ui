import { ReactNode } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  children: ReactNode;
}

export interface DialogTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  asChild?: boolean;
}

export interface DialogContentProps extends RadixDialog.DialogContentProps {
  children: ReactNode;
  showClose?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
  onClose?: () => void;
  showOverlay?: boolean;
  reducePadding?: boolean;
}
