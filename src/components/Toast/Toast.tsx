import { ReactNode, createContext, useEffect, useState } from "react";
import * as RadixUIToast from "@radix-ui/react-toast";
import { Button, ButtonProps, Icon, IconButton, IconName } from "@/components";
import { keyframes, styled } from "styled-components";
import { toastsEventEmitter } from "./toastEmitter";

export interface ToastContextProps {
  createToast: (toast: ToastProps) => void;
}
export const ToastContext = createContext<ToastContextProps>({
  createToast: () => null,
});

export type ToastType = "danger" | "warning" | "default" | "success";
export interface ToastProps {
  id?: string;
  type?: ToastType;
  title: string;
  description?: ReactNode;
  /** Time in milliseconds the toast will be visible */
  duration?: number;
  actions?: Array<ButtonProps & { altText: string }>;
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

const Toast = ({
  type,
  title,
  description,
  actions = [],
  duration,
  onClose,
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
                <RadixUIToast.Action altText={altText}>
                  <Button {...btnProps} />
                </RadixUIToast.Action>
              ))}
            </ToastDescriptionContent>
          )}
        </ToastDescriptionContainer>
      )}
    </ToastRoot>
  );
};

const Viewport = styled(RadixUIToast.Viewport)<{ $align: "start" | "end" }>`
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

export interface ToastProviderProps extends RadixUIToast.ToastProps {
  align: "start" | "end";
}

export const ToastProvider = ({ children, align, ...props }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Map<string, ToastProps>>(new Map());

  useEffect(() => {
    const listener = (toast: ToastProps) => {
      setToasts(currentToasts => {
        const newMap = new Map(currentToasts);
        newMap.set(toast?.id ?? String(Date.now()), toast);
        return newMap;
      });
    };

    toastsEventEmitter.on(listener);

    return () => toastsEventEmitter.off(listener);
  }, []);

  const onClose = (id: string) => (open: boolean) => {
    if (!open) {
      setToasts(currentToasts => {
        const newMap = new Map(currentToasts);
        newMap.delete(id);
        return newMap;
      });
    }
  };
  const value = {
    createToast: (toast: ToastProps) => {
      setToasts(currentToasts => {
        const newMap = new Map(currentToasts);
        newMap.set(toast?.id ?? String(Date.now()), toast);
        return newMap;
      });
    },
  };

  return (
    <RadixUIToast.Provider
      swipeDirection={align === "start" ? "left" : "right"}
      {...props}
    >
      <ToastContext.Provider value={value}>
        {children}
        {Array.from(toasts).map(([id, toast]) => (
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
