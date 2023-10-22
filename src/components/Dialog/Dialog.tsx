import { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";
import { Button, Icon, Spacer, Title } from "@/components";
import { CrossButton } from "../commonElement";

export const Dialog = ({ children, ...props }: RadixDialog.DialogProps) => {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
};

// Dialog Trigger
const Trigger = styled(RadixDialog.Trigger)`
  width: fit-content;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const DialogTrigger = ({ children, ...props }: RadixDialog.DialogTriggerProps) => {
  return <Trigger {...props}>{children}</Trigger>;
};

DialogTrigger.displayName = "DialogTrigger";
Dialog.Trigger = DialogTrigger;

// Dialog Close
interface DialogCloseProps extends RadixDialog.DialogCloseProps {
  label: string;
}

const DialogClose = ({ label }: DialogCloseProps) => {
  label = label ?? "Close";
  return (
    <RadixDialog.Close asChild>
      <Button type="secondary">{label}</Button>
    </RadixDialog.Close>
  );
};

DialogClose.displayName = "DialogClose";
Dialog.Close = DialogClose;

// Dialog Content
const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const DialogOverlay = styled(RadixDialog.Overlay)`
  background-color: ${({ theme }) => theme.click.dialog.color.opaqueBackground.default};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const ContentArea = styled(RadixDialog.Content)`
  background: ${({ theme }) => theme.click.dialog.color.background.default};
  border-radius: ${({ theme }) => theme.click.dialog.radii.all};
  padding: ${({ theme }) => theme.click.dialog.space.y}
    ${({ theme }) => theme.click.dialog.space.x};
  box-shadow: ${({ theme }) => theme.click.dialog.shadow.default};
  border: 1px solid ${({ theme }) => theme.click.global.color.stroke.default};
  width: 75%;
  max-width: 670px;
  position: fixed;
  top: 25%;
  margin-top: 20%;
  left: 50%;
  max-height: 75%;
  overflow: auto;
  transform: translate(-50%, -50%);
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ theme }) => theme.sizes[9]}; // 32px
`;

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
  title: string;
  showClose?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
  children: ReactNode;
  onClose?: () => void;
}

const DialogContent = ({
  title,
  children,
  showClose,
  onClose,
  forceMount,
  container,
}: DialogContentProps) => {
  return (
    <RadixDialog.Portal
      forceMount={forceMount}
      container={container}
    >
      <DialogOverlay />
      <ContentArea>
        <TitleArea>
          <Title
            size="xl"
            type="h2"
          >
            {title}
          </Title>
          {showClose && <CloseButton onClose={onClose} />}
        </TitleArea>
        <Spacer />
        {children}
      </ContentArea>
    </RadixDialog.Portal>
  );
};

DialogContent.displayName = "DialogContent";
Dialog.Content = DialogContent;
