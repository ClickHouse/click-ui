'use client';

import { useContext } from 'react';
// WARN: The hook brings Toast component chunks
// it's assumed that consumer use Toast component
// useToast is useless without ToastProvider
import { ToastContext, ToastContextProps } from '@/components/Toast';

export const useToast = (): ToastContextProps => {
  const result = useContext(ToastContext);
  if (!result) {
    throw new Error('Context used outside of its Provider!');
  }
  return result;
};
