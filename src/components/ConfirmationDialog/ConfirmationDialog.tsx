import { Container } from '@/components/Container/Container';
import { Dialog } from '@/components/Dialog/Dialog';
import { Separator } from '@/components/Separator/Separator';
import { Text } from '@/components/Typography/Text/Text';
import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { styled } from 'styled-components';

type DialogPrimaryAction = 'primary' | 'danger';

export interface ConfirmationDialogProps extends HTMLAttributes<HTMLDivElement> {
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

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.click.dialog.space.gap};
  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.sm}) {
    flex-direction: column;
  }
`;

const DialogContent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ConfirmationDialog = ({
  children,
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
      <DialogContent
        as={Dialog.Content}
        title={title}
        showClose={showClose}
        {...props}
      >
        <Container
          overflow="auto"
          grow="1"
          orientation="vertical"
        >
          {children ? children : <Text>{message}</Text>}
        </Container>
        <Separator size="xl" />
        <ActionsWrapper>
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
        </ActionsWrapper>
      </DialogContent>
    </Dialog>
  );
};
