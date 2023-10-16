import React, { HTMLAttributes } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, IconButton } from "..";
import styled from "styled-components";

export const Flyout = (props: Dialog.DialogProps) => {
  return <Dialog.Root {...props} />;
};

const Trigger = ({ children, ...props }: Dialog.DialogTriggerProps) => {
  return (
    <Dialog.Trigger
      asChild
      {...props}
    >
      <div>{children}</div>
    </Dialog.Trigger>
  );
};
Trigger.displayName = "Flyout.Trigger";
Flyout.Trigger = Trigger;

type FlyoutSizeType = "narrow" | "wide";

interface DialogContentProps extends Dialog.DialogContentProps {
  container?: HTMLElement | null;
  showOverlay?: boolean;
  showClose?: boolean;
  size?: FlyoutSizeType;
}

const FlyoutContent = styled(Dialog.Content)<{ $size?: FlyoutSizeType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
  ${({ theme, $size = "narrow" }) => `
    width: ${theme.click.flyout.size[$size].width};
    padding: ${theme.click.flyout.space.y} ${theme.click.flyout.space.x};
    gap: ${theme.click.flyout.space.gap};
    border-left: 1px solid ${theme.click.flyout.color.stroke.default};
    background: ${theme.click.flyout.color.background.default};
    box-shadow: -6px 0px 10px 0px ${theme.click.flyout.shadow.default}, -5px 0px 20px 0px ${theme.click.flyout.shadow.default};
  `}
`;

const Content = ({
  showOverlay = false,
  children,
  container,
  size,
  ...props
}: DialogContentProps) => {
  return (
    <Dialog.Portal container={container}>
      {showOverlay && <Dialog.Overlay className="DialogOverlay" />}
      <FlyoutContent
        $size={size}
        className="DialogContent"
        {...props}
      >
        {children}
      </FlyoutContent>
    </Dialog.Portal>
  );
};
Content.displayName = "Flyout.Content";
Flyout.Content = Content;

interface TitleHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  description: string;
  children?: never;
}

interface ChildrenHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: never;
  description?: never;
}

type HeaderProps = TitleHeaderProps | ChildrenHeaderProps;

const FlyoutHeaderContainer = styled.div<{ $showBorder?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0rem 1.5rem 1rem;
  ${({ theme, $showBorder = true }) => `
    border-bottom: ${
      $showBorder ? `1px solid ${theme.click.flyout.color.stroke.default}` : "none"
    };
  `}
`;

const FlexGrow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FlyoutTitle = styled(Dialog.Title)`
  ${({ theme }) => `
    color: ${theme.click.flyout.color.title.default};
    font: ${theme.typography.styles.product.titles.xl};
  `}
`;

const FlyoutDescription = styled(Dialog.Description)`
  ${({ theme }) => `
    color: ${theme.click.flyout.color.description.default};
    font: ${theme.typography.styles.product.text.normal.md};
  `}
`;

const Header = ({ title, description, children, ...props }: HeaderProps) => {
  if (children) {
    return (
      <FlyoutHeaderContainer
        $showBorder={false}
        {...props}
      >
        <FlexGrow>{children}</FlexGrow>
        <Dialog.Close asChild>
          <IconButton
            icon="cross"
            type="ghost"
            size="xs"
          />
        </Dialog.Close>
      </FlyoutHeaderContainer>
    );
  }

  return (
    <FlyoutHeaderContainer {...props}>
      <FlexGrow>
        <FlyoutTitle>{title}</FlyoutTitle>
        {description && (
          <FlyoutDescription>
            Make changes to your profile here. Click save when you're done.
          </FlyoutDescription>
        )}
      </FlexGrow>
      <Dialog.Close>
        <IconButton icon="cross" />
      </Dialog.Close>
    </FlyoutHeaderContainer>
  );
};
Header.displayName = "Flyout.Header";
Flyout.Header = Header;

const FlyoutBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${({ theme }) => `
    gap: ${theme.click.flyout.space.gap};
  `}
  padding: 0 1.5rem;
`;

const Body = (props: HTMLAttributes<HTMLDivElement>) => <FlyoutBody {...props} />;

Body.displayName = "Flyout.Body";
Flyout.Body = Body;

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  cancelText?: string;
  showClose?: boolean;
}

const FlyoutFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem 0;
  ${({ theme }) => `
    border-top: 1px solid ${theme.click.flyout.color.stroke.default};
  `}
`;

const Footer = ({ cancelText, showClose, children, ...props }: FooterProps) => {
  return (
    <FlyoutFooter {...props}>
      {showClose && (
        <Dialog.Close asChild>
          <Button type="secondary">{cancelText ?? "Cancel"}</Button>
        </Dialog.Close>
      )}
      {children}
    </FlyoutFooter>
  );
};
Footer.displayName = "Flyout.Footer";
Flyout.Footer = Footer;
