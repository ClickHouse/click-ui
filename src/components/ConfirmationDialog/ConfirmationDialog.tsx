import { Container } from '@/components/Container';
import { Dialog } from '@/components/Dialog';
import { Separator } from '@/components/Separator';
import { Text } from '@/components/Text';
import { ReactElement } from 'react';
import { styled } from 'styled-components';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

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
