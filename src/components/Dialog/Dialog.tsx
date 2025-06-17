import { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { keyframes, styled } from "styled-components";
import { Button, Icon, Spacer } from "@/components";
import { CrossButton } from "../commonElement";
import { ButtonProps } from "@/components/Button/Button";

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
  padding: ${({ theme }) =>
    `${theme.click.dialog.space.y} ${theme.click.dialog.space.x}`};
  box-shadow: ${({ theme }) => theme.click.dialog.shadow.default};
  border: 1px solid ${({ theme }) => theme.click.global.color.stroke.default};
  width: 75%;
  max-width: 670px;
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 75%;
  overflow: auto;
  transform: translate(-50%, -50%);
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.sm}) {
    max-height: 100%;
    border-radius: 0;
    width: 100%;
  }
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ theme }) => theme.sizes[9]}; // 32px
`;

const Title = styled.h2`
  font: ${({ theme }) => theme.click.dialog.typography.title.default};
  padding: 0;
  margin: 0;
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
  showOverlay?: boolean;
}

const DialogContent = ({
  title,
  children,
  showClose,
  onClose,
  forceMount,
  container,
  showOverlay = true,
  ...props
}: DialogContentProps) => {
  return (
    <RadixDialog.Portal
      forceMount={forceMount}
      container={container}
    >
      {showOverlay && <DialogOverlay />}
      <ContentArea {...props}>
        <TitleArea>
          <Title>{title}</Title>
          {showClose && <CloseButton onClose={onClose} />}
        </TitleArea>
        <Spacer size="sm" />
        {children}
      </ContentArea>
    </RadixDialog.Portal>
  );
};

DialogContent.displayName = "DialogContent";
Dialog.Content = DialogContent;
