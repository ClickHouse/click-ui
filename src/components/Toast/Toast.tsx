import { ReactNode, createContext, useEffect, useState } from "react";
import * as RadixUIToast from "@radix-ui/react-toast";
import { Button, ButtonProps, Icon, IconButton, IconName } from "@/components";
import { keyframes, styled } from "styled-components";
import { toastsEventEmitter } from "./toastEmitter";

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

const ToastIcon = styled(Icon)<{ $type?: ToastType }>`
  ${({ theme, $type = "default" }) => `
  width: ${theme.click.toast.icon.size.width};
  height: ${theme.click.toast.icon.size.height};
  color: ${theme.click.toast.color.icon[$type]}
`}
`;
const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
`;
const swipeOut = keyframes`
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
`;

const ToastRoot = styled(RadixUIToast.Root)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  ${({ theme }) => `
    padding: ${theme.click.toast.space.y} ${theme.click.toast.space.x};
    gap: ${theme.click.toast.space.gap};
    border-radius: ${theme.click.toast.radii.all};
    border: 1px solid ${theme.click.toast.color.stroke.default};
    background: ${theme.click.global.color.background.default};
    box-shadow: ${theme.click.toast.shadow};
  `}
  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: ${hide} 100ms ease-in;
  }
  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe="end"] {
    animation: ${swipeOut} 100ms ease-out;
  }
`;

const ToastHeader = styled(RadixUIToast.Title)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: inherit;
  ${({ theme }) => `
    font: ${theme.click.toast.typography.title.default};
    color: ${theme.click.toast.color.title.default};
  `}
`;

const ToastDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
  gap: inherit;
  ${({ theme }) => `
    font: ${theme.click.toast.typography.title.default};
    color: ${theme.click.toast.color.title.default};
  `}
`;

const ToastDescriptionContent = styled.div`
  display: flex;
  align-self: stretch;
  gap: inherit;
  ${({ theme }) => `
    font: ${theme.click.toast.typography.description.default};
    color: ${theme.click.toast.color.description.default};
  `}
`;

const Title = styled.div`
  flex: 1;
`;

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
    <ToastRoot
      onOpenChange={onClose}
      duration={duration}
      type={toastType}
      {...props}
    >
      <ToastHeader>
        {iconName.length > 0 && (
          <ToastIcon
            name={iconName as IconName}
            $type={type}
          />
        )}
        <Title>{title}</Title>
        <RadixUIToast.Close asChild>
          <IconButton
            icon="cross"
            type="ghost"
          />
        </RadixUIToast.Close>
      </ToastHeader>
      {(description || actions.length > 0) && (
        <ToastDescriptionContainer>
          <ToastDescriptionContent as={RadixUIToast.Description}>
            {description}
          </ToastDescriptionContent>
          {actions.length > 0 && (
            <ToastDescriptionContent>
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
            </ToastDescriptionContent>
          )}
        </ToastDescriptionContainer>
      )}
    </ToastRoot>
  );
};

const Viewport = styled(RadixUIToast.Viewport)<{ $align: ToastAlignment }>`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  ${({ $align }) => {
    if ($align === "start") {
      return "left: 0";
    }
    return `
      right: 0;
  `;
  }};
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: ${({ theme }) => theme.click.toast.space.gap};
  width: ${({ theme }) => theme.click.toast.size.width};
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

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
      <Viewport $align={align} />
    </RadixUIToast.Provider>
  );
};
