import { useContext } from 'react';
import { ToastContext, ToastContextProps } from '@/components/Toast';

export const useToast = (): ToastContextProps => {
  const result = useContext(ToastContext);
  if (!result) {
    throw new Error('Context used outside of its Provider!');
  }
  return result;
};
