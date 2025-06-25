import { Container, Dialog, Separator, Text } from "@/components";
import { ReactElement, ReactNode } from "react";
import { styled } from "styled-components";

type DialogPrimaryAction = "primary" | "danger";

export interface ConfirmationDialogProps {
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

  /**
   * Run the onConfirm callback when the Enter key is pressed.
   * Prevents the default action of the Enter key if the dialog is not disabled or loading.
   *
   * @param event - The React keyboard event
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && onConfirm && !disabled && !loading) {
      event.preventDefault();
      onConfirm();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
        !open && onCancel && onCancel();
      }}
    >
      <DialogContent
        as={Dialog.Content}
        title={title}
        showClose={showClose}
        onKeyDown={handleKeyDown}
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
