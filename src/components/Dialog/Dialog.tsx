import { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { Button, Icon, Spacer } from "@/components";
import { CrossButton } from "@/components/commonElement";
import { ButtonProps } from "@/components/Button/Button";
import styles from "./Dialog.module.scss";

export const Dialog = ({ children, ...props }: RadixDialog.DialogProps) => {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
};

const DialogTrigger = ({
  children,
  asChild,
  className,
  ...props
}: RadixDialog.DialogTriggerProps) => {
  if (asChild) {
    // Pass all props to RadixDialog.Trigger, no styled wrapper
    return (
      <RadixDialog.Trigger
        asChild
        {...props}
      >
        {children}
      </RadixDialog.Trigger>
    );
  }
  // Use styled Trigger if not asChild
  return (
    <RadixDialog.Trigger
      className={clsx(styles.cuiTrigger, className)}
      {...props}
    >
      {children}
    </RadixDialog.Trigger>
  );
};

DialogTrigger.displayName = "DialogTrigger";
Dialog.Trigger = DialogTrigger;

const DialogClose = ({ label = "Close", type = "secondary", ...props }: ButtonProps) => (
  <RadixDialog.Close asChild>
    <Button
      type={type}
      label={label}
      {...props}
    />
  </RadixDialog.Close>
);

DialogClose.displayName = "DialogClose";
Dialog.Close = DialogClose;

// Dialog Content

const CloseButton = ({ onClose }: { onClose?: () => void }) => (
  <RadixDialog.Close asChild>
    <CrossButton onClick={onClose}>
      <Icon
        name="cross"
        size="lg"
      />
    </CrossButton>
  </RadixDialog.Close>
);

export interface DialogContentProps extends RadixDialog.DialogContentProps {
  /** The title text displayed in the dialog header */
  title?: string;
  /** Whether to show the close button */
  showClose?: boolean;
  /** Whether to force mount the dialog */
  forceMount?: true;
  /** Container element to portal the dialog into */
  container?: HTMLElement | null;
  /** The content to display in the dialog */
  children: ReactNode;
  /** Callback when the dialog is closed */
  onClose?: () => void;
  /** Whether to show the overlay backdrop */
  showOverlay?: boolean;
  /** Whether to use reduced padding */
  reducePadding?: boolean;
}

const DialogContent = ({
  title,
  children,
  showClose,
  onClose,
  forceMount,
  container,
  showOverlay = true,
  reducePadding = false,
  className,
  ...props
}: DialogContentProps) => {
  return (
    <RadixDialog.Portal
      forceMount={forceMount}
      container={container}
    >
      {showOverlay && <RadixDialog.Overlay className={styles.cuiDialogOverlay} />}
      <RadixDialog.Content
        data-testid="click-dialog-contentarea"
        className={clsx(
          styles.cuiContentArea,
          {
            [styles.cuiRegularPadding]: !reducePadding,
            [styles.cuiReducedPadding]: reducePadding,
          },
          className
        )}
        {...props}
      >
        {(title || showClose) && (
          <>
            <div
              className={clsx(styles.cuiTitleArea, {
                [styles.cuiSpaceBetween]: !showClose || title,
                [styles.cuiFlexEnd]: showClose && !title,
              })}
            >
              {title && (
                <h2
                  className={styles.cuiTitle}
                  data-testid="click-dialog-title"
                >
                  {title}
                </h2>
              )}
              {showClose && (
                <CloseButton
                  data-testid="click-dialog-close"
                  onClose={onClose}
                />
              )}
            </div>
            <Spacer size="sm" />
          </>
        )}

        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

DialogContent.displayName = "DialogContent";
Dialog.Content = DialogContent;
