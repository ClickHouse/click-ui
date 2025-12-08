"use client";

import { Container, Dialog, Separator, Text } from "@/components";
import { HTMLAttributes, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import styles from "./ConfirmationDialog.module.scss";

type DialogPrimaryAction = "primary" | "danger";

export interface ConfirmationDialogProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  message?: string;
  onCancel?: () => void;
  onConfirm?: (() => void) | (() => Promise<void>);
  open?: boolean;
  primaryActionLabel?: string;
  primaryActionType?: DialogPrimaryAction;
  secondaryActionLabel?: string;
  showClose?: boolean;
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
        !open && onCancel && onCancel();
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
