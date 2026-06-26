import { Container } from '@/components/Container';
import { Dialog } from '@/components/Dialog';
import { Separator } from '@/components/Separator';
import { Text } from '@/components/Text';
import { ReactElement } from 'react';
import { cn } from '@/lib/cva';
import styles from './ConfirmationDialog.module.css';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

export const ConfirmationDialog = ({
  children,
  className,
  disabled,
  loading,
  message,
  onCancel,
  onConfirm,
  open,
  primaryActionLabel = 'Confirm',
  primaryActionType = 'primary',
  secondaryActionLabel = 'Cancel',
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
        title={title}
        showClose={showClose}
        {...props}
        className={cn(styles.content, className)}
      >
        <Container
          overflow="auto"
          grow="1"
          orientation="vertical"
        >
          {children ? children : <Text>{message}</Text>}
        </Container>
        <Separator size="xl" />
        <div className={styles.actions}>
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
