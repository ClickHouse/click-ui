import { ReactNode } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

export interface DialogContentProps extends RadixDialog.DialogContentProps {
  children: ReactNode;
  showClose?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
  onClose?: () => void;
  showOverlay?: boolean;
  reducePadding?: boolean;
}
