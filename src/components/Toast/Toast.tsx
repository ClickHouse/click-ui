import { createContext, useEffect, useState } from 'react';
import * as RadixUIToast from '@radix-ui/react-toast';
import { cn, cva } from '@/lib/cva';
import { toastsEventEmitter } from './toastEmitter';
import { Icon, type IconName, type IconProps } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Button } from '@/components/Button';
import { ToastContextProps, ToastProps, ToastAlignment, ToastType } from './Toast.types';
import styles from './Toast.module.css';

export const ToastContext = createContext<ToastContextProps>({
  createToast: () => null,
});

const toastIconVariants = cva(styles.toast__icon, {
  variants: {
    type: {
      default: styles['toast__icon_type_default'],
      success: styles['toast__icon_type_success'],
      warning: styles['toast__icon_type_warning'],
      danger: styles['toast__icon_type_danger'],
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

// Lazy wrapper to avoid circular dependency issues at module load time
const ToastIcon = ({
  $type = 'default',
  className,
  ...props
}: IconProps & { $type?: ToastType }) => (
  <Icon
    {...props}
    className={cn(toastIconVariants({ type: $type }), className)}
  />
);

const viewportVariants = cva(styles['toast-viewport'], {
  variants: {
    align: {
      start: styles['toast-viewport_align_start'],
      end: styles['toast-viewport_align_end'],
    },
  },
  defaultVariants: {
    align: 'end',
  },
});

export const Toast = ({
  type,
  toastType = 'foreground',
  title,
  description,
  actions = [],
  duration,
  onClose,
  className,
  ...props
}: ToastProps & { onClose: (open: boolean) => void }) => {
  let iconName = '';
  if (type === 'default') {
    iconName = 'info-in-circle';
  } else if (type === 'success') {
    iconName = 'check';
  } else if (type && ['danger', 'warning'].includes(type)) {
    iconName = 'warning';
  }
  return (
    <RadixUIToast.Root
      onOpenChange={onClose}
      duration={duration}
      type={toastType}
      {...props}
      className={cn(styles.toast, className)}
    >
      <RadixUIToast.Title className={styles.toast__header}>
        {iconName.length > 0 && (
          <ToastIcon
            name={iconName as IconName}
            $type={type}
          />
        )}
        <div className={styles.toast__title}>{title}</div>
        <RadixUIToast.Close asChild>
          <IconButton
            icon="cross"
            type="ghost"
          />
        </RadixUIToast.Close>
      </RadixUIToast.Title>
      {(description || actions.length > 0) && (
        <div className={styles['toast__description-container']}>
          <RadixUIToast.Description className={styles['toast__description-content']}>
            {description}
          </RadixUIToast.Description>
          {actions.length > 0 && (
            <div className={styles['toast__description-content']}>
              {actions.map(({ altText, ...btnProps }) => (
                <RadixUIToast.Action
                  altText={altText}
                  asChild
                  key={altText}
                >
                  <div>
                    <Button {...btnProps} />
                  </div>
                </RadixUIToast.Action>
              ))}
            </div>
          )}
        </div>
      )}
    </RadixUIToast.Root>
  );
};

export interface ToastProviderProps extends RadixUIToast.ToastProviderProps {
  align?: ToastAlignment;
}

export const ToastProvider = ({
  children,
  align = 'end',
  ...props
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Record<ToastAlignment, Map<string, ToastProps>>>({
    start: new Map(),
    end: new Map(),
  });

  useEffect(() => {
    const listener = (toast: ToastProps) => {
      setToasts(currentToasts => {
        const alignment = toast.align ?? 'end';
        const newToasts = { ...currentToasts };
        const map = new Map(newToasts[alignment]);
        map.set(toast?.id ?? String(Date.now()), toast);
        newToasts[alignment] = map;
        return newToasts;
      });
    };

    toastsEventEmitter.on(listener);

    return () => toastsEventEmitter.off(listener);
  }, []);

  const onClose = (id: string) => (open: boolean) => {
    if (!open) {
      setToasts(currentToasts => {
        const newToasts = { ...currentToasts };
        const map = new Map(newToasts[align]);
        map.delete(id);
        newToasts[align] = map;
        return newToasts;
      });
    }
  };

  const value = {
    createToast: (toast: ToastProps, toastAlign: ToastAlignment = align) => {
      setToasts(currentToasts => {
        const newToasts = { ...currentToasts };
        const map = new Map(newToasts[toastAlign]);
        map.set(toast?.id ?? String(Date.now()), toast);
        newToasts[toastAlign] = map;
        return newToasts;
      });
    },
  };

  return (
    <RadixUIToast.Provider
      swipeDirection={align === 'start' ? 'left' : 'right'}
      key={`toast-provider-${align}`}
      {...props}
    >
      <ToastContext.Provider value={value}>
        {children}
        {Array.from(toasts[align]).map(([id, toast]) => (
          <Toast
            key={id}
            {...toast}
            onClose={onClose(id)}
          />
        ))}
      </ToastContext.Provider>
      <RadixUIToast.Viewport className={cn(viewportVariants({ align }))} />
    </RadixUIToast.Provider>
  );
};
