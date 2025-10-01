import { ReactNode, createContext, useEffect, useState } from "react";
import * as RadixUIToast from "@radix-ui/react-toast";
import { Button, ButtonProps, Icon, IconButton, IconName } from "@/components";
import clsx from "clsx";
import { toastsEventEmitter } from "./toastEmitter";
import styles from "./Toast.module.scss";

export interface ToastContextProps {
  createToast: (toast: ToastProps, align?: ToastAlignment) => void;
}
export const ToastContext = createContext<ToastContextProps>({
  createToast: () => null,
});

export type ToastAlignment = "start" | "end";
export type ToastType = "danger" | "warning" | "default" | "success";
export interface ToastProps extends Omit<RadixUIToast.ToastProps, "type"> {
  /** Unique identifier for the toast */
  id?: string;
  /** The visual style type of the toast */
  type?: ToastType;
  /** The type of toast for screen reader announcements */
  toastType?: "foreground" | "background";
  /** The title text displayed in the toast */
  title: string;
  /** Optional description content */
  description?: ReactNode;
  /** Time in milliseconds the toast will be visible */
  duration?: number;
  /** Action buttons to display in the toast */
  actions?: Array<ButtonProps & { altText: string }>;
  /** Horizontal alignment of the toast - start or end */
  align?: ToastAlignment;
}

export const Toast = ({
  type,
  toastType = "foreground",
  title,
  description,
  actions = [],
  duration,
  onClose,

  ...props
}: ToastProps & { onClose: (open: boolean) => void }) => {
  let iconName = "";
  if (type === "default") {
    iconName = "info-in-circle";
  } else if (type === "success") {
    iconName = "check";
  } else if (type && ["danger", "warning"].includes(type)) {
    iconName = "warning";
  }
  return (
    <RadixUIToast.Root
      className={styles.cuiToastRoot}
      onOpenChange={onClose}
      duration={duration}
      type={toastType}
      {...props}
    >
      <RadixUIToast.Title className={styles.cuiToastHeader}>
        {iconName.length > 0 && (
          <Icon
            name={iconName as IconName}
            className={clsx(styles.cuiToastIcon, {
              [styles.cuiIconDefault]: type === "default",
              [styles.cuiIconSuccess]: type === "success",
              [styles.cuiIconDanger]: type === "danger",
              [styles.cuiIconWarning]: type === "warning",
            })}
          />
        )}
        <div className={styles.cuiTitle}>{title}</div>
        <RadixUIToast.Close asChild>
          <IconButton
            icon="cross"
            type="ghost"
          />
        </RadixUIToast.Close>
      </RadixUIToast.Title>
      {(description || actions.length > 0) && (
        <div className={styles.cuiToastDescriptionContainer}>
          <RadixUIToast.Description className={styles.cuiToastDescriptionContent}>
            {description}
          </RadixUIToast.Description>
          {actions.length > 0 && (
            <div className={styles.cuiToastDescriptionContent}>
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
  align = "end",
  ...props
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Record<ToastAlignment, Map<string, ToastProps>>>({
    start: new Map(),
    end: new Map(),
  });

  useEffect(() => {
    const listener = (toast: ToastProps) => {
      setToasts(currentToasts => {
        const alignment = toast.align ?? "end";
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
      swipeDirection={align === "start" ? "left" : "right"}
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
      <RadixUIToast.Viewport
        className={clsx(styles.cuiViewport, {
          [styles.cuiAlignStart]: align === "start",
          [styles.cuiAlignEnd]: align === "end",
        })}
      />
    </RadixUIToast.Provider>
  );
};
