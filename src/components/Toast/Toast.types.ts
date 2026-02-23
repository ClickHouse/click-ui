import { ReactNode } from 'react';
import * as RadixUIToast from '@radix-ui/react-toast';
import type { ButtonProps } from '@/components/Button/Button.types';

export interface ToastContextProps {
  createToast: (toast: ToastProps, align?: ToastAlignment) => void;
}

export type ToastAlignment = 'start' | 'end';
export type ToastType = 'danger' | 'warning' | 'default' | 'success';

export interface ToastProps extends Omit<RadixUIToast.ToastProps, 'type'> {
  id?: string;
  type?: ToastType;
  toastType?: 'foreground' | 'background';
  title: string;
  description?: ReactNode;
  duration?: number;
  actions?: Array<ButtonProps & { altText: string }>;
  align?: ToastAlignment;
}

export interface ToastProviderProps {
  children: ReactNode;
}
