import { Dialog, Separator, Text } from "@/components";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

type DialogPrimaryAction = "primary" | "danger";

export interface ConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (b: boolean) => void;
  title: string;
  primaryActionType?: DialogPrimaryAction;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  message?: string;
  children?: ReactNode;
  loading?: boolean;
  onPrimaryActionClick?: (() => void) | (() => Promise<void>);
}

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.click.dialog.space.gap};
`;

export const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  message,
  loading,
  primaryActionType = "primary",
  primaryActionLabel = "Confirm",
  secondaryActionLabel = "Cancel",
  onPrimaryActionClick,
  children,
}: ConfirmationDialogProps): ReactElement => {
  if (children && message) {
    throw new Error(
      "You can't pass children and message props at the same time"
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Content title={title}>
        {children ? children : <Text>{message}</Text>}
        <Separator size="xl" />
        <ActionsWrapper>
          <Dialog.Close label={secondaryActionLabel} />
          <Dialog.Close
            loading={!!loading}
            disabled={!!loading}
            type={primaryActionType}
            label={primaryActionLabel}
            onClick={() => {
              if (onPrimaryActionClick) {
                onPrimaryActionClick();
              }
              if (onOpenChange) {
                onOpenChange(false);
              }
            }}
          />
        </ActionsWrapper>
      </Dialog.Content>
    </Dialog>
  );
};
