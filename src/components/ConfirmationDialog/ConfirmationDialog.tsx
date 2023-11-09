import { Dialog, Separator, Text } from "@/components";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

type DialogPrimaryAction = "primary" | "danger";

export interface ConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (b: boolean) => void;
  title: string;
  message: string;
  primaryActionType?: DialogPrimaryAction;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryActionClick?: (() => void) | (() => Promise<void>);
  children?: ReactNode;
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
  primaryActionType = "primary",
  primaryActionLabel = "Confirm",
  secondaryActionLabel = "Cancel",
  onPrimaryActionClick,
  children,
}: ConfirmationDialogProps): ReactElement => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      {children && <Dialog.Trigger>{children}</Dialog.Trigger>}
      <Dialog.Content title={title}>
        <Text>{message}</Text>
        <Separator size="xl" />
        <ActionsWrapper>
          <Dialog.Close label={secondaryActionLabel} />
          <Dialog.Close
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
