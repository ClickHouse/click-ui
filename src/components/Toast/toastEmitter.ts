import { EventEmitter } from '@/lib/EventEmitter';
import type { ToastProps } from './Toast.types';

export const toastsEventEmitter = new EventEmitter<ToastProps>();

export const createToast = (toast: ToastProps): void => {
  toastsEventEmitter.emit(toast);
};
