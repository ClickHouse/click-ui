"use client";

import { Container, Dialog, Separator, Text } from "@/components";
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import styles from "./ConfirmationDialog.module.scss";

type DialogPrimaryAction = "primary" | "danger";

export interface ConfirmationDialogProps extends ComponentPropsWithoutRef<"div"> {
  /** Custom content to display instead of the message */
  children?: ReactNode;
  /** Whether the confirm button is disabled */
  disabled?: boolean;
  /** Whether the confirm button shows a loading state */
  loading?: boolean;
  /** The message text to display in the dialog */
  message?: string;
  /** Callback when the dialog is cancelled */
  onCancel?: () => void;
  /** Callback when the confirm button is clicked */
  onConfirm?: (() => void) | (() => Promise<void>);
  /** Whether the dialog is open */
  open?: boolean;
  /** Label for the primary action button */
  primaryActionLabel?: string;
  /** Type of the primary action button */
  primaryActionType?: DialogPrimaryAction;
  /** Label for the secondary (cancel) action button */
  secondaryActionLabel?: string;
  /** Whether to show the close button */
  showClose?: boolean;
  /** The title text displayed in the dialog header */
  title: string;
}

export const ConfirmationDialog = ({
  children,
  disabled,
  loading,
  message,
  onCancel,
  onConfirm,
  open,
  primaryActionLabel = "Confirm",
  primaryActionType = "primary",
  secondaryActionLabel = "Cancel",
  showClose,
  title,
  ...props
}: ConfirmationDialogProps): ReactElement => {
  if (children && message) {
    throw new Error("You can't pass children and message props at the same time");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
        if (!open && onCancel) {
          onCancel();
        }
      }}
    >
      <Dialog.Content
        {...props}
        className={clsx(styles.cuiDialogContent, props.className)}
        title={title}
        showClose={showClose}
      >
        <Container
          overflow="auto"
          grow="1"
          orientation="vertical"
        >
          {children ? children : <Text>{message}</Text>}
        </Container>
        <Separator size="xl" />
        <div className={styles.cuiActionsWrapper}>
          <Dialog.Close
            label={secondaryActionLabel}
            data-testid="cancel-action-button"
          />
          <Dialog.Close
            loading={!!loading}
            disabled={!!disabled || !!loading}
            type={primaryActionType}
            label={primaryActionLabel}
            autoFocus={open}
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
            }}
            data-testid="confirm-action-button"
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
