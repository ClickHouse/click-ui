import { ReactNode } from 'react';
import {
  DialogProps,
  DialogContentProps as RadixDialogContentProps,
} from '@radix-ui/react-dialog';
import type { ContainerProps } from '@/components/Container';

export type FlyoutProps = DialogProps;

export interface DialogContentProps extends RadixDialogContentProps {
  children: ReactNode;
  showClose?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
}

export interface FlyoutHeaderProps extends ContainerProps<'div'> {
  title: string;
}

export interface FlyoutFooterProps {
  children: ReactNode;
}
