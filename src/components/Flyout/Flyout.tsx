import { HTMLAttributes } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, IconButton, Separator } from "..";
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
type Strategy = "relative" | "absolute" | "fixed";
interface DialogContentProps extends Dialog.DialogContentProps {
  container?: HTMLElement | null;
  showOverlay?: boolean;
  showClose?: boolean;
  size?: FlyoutSizeType;
  strategy?: Strategy;
  closeOnInteractOutside?: boolean;
}

const FlyoutContent = styled(Dialog.Content)<{
  $size?: FlyoutSizeType;
  $strategy: Strategy;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 1;
  top: 0;
  right: 0;
  ${({ theme, $size = "narrow", $strategy }) => `
    position: ${$strategy};
    width: ${theme.click.flyout.size[$size].width};
    padding: ${theme.click.flyout.space.y} ${theme.click.flyout.space.x};
    gap: ${theme.click.flyout.space.gap};
    border-left: 1px solid ${theme.click.flyout.color.stroke.default};
    background: ${theme.click.flyout.color.background.default};
    box-shadow: -6px 0px 10px 0px ${
      theme.click.flyout.shadow.default
    }, -5px 0px 20px 0px ${theme.click.flyout.shadow.default};
    ${
      $strategy === "relative"
        ? `
        @media (max-width: 1024px) {
          position: absolute !important;
          overflow: hidden;
          transform: translateX(calc(100% - 50px));
          transition: 0.3s ease-in-out;
          &:hover,
          &.active,
          &:focus-within {
            transform: translateX(0);
            left: auto;
          }
        }
    `
        : ""
    }
  `}
`;
const FlyoutContainer = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  flex-flow: column nowrap;
`;

const Content = ({
  showOverlay = false,
  children,
  container,
  strategy = "relative",
  size,
  closeOnInteractOutside = false,
  onInteractOutside,
  ...props
}: DialogContentProps) => {
  return (
    <Dialog.Portal container={container}>
      {showOverlay && <Dialog.Overlay className="DialogOverlay" />}
      <FlyoutContent
        $size={size}
        $strategy={strategy}
        onInteractOutside={e => {
          if (!closeOnInteractOutside) {
            e.preventDefault();
          }
          if (typeof onInteractOutside === "function") {
            onInteractOutside(e);
          }
        }}
        {...props}
      >
        {children}
      </FlyoutContent>
    </Dialog.Portal>
  );
};
Content.displayName = "Flyout.Content";
Flyout.Content = Content;

const FlyoutElement = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `
    gap: ${theme.click.flyout.space.gap};
    padding: 0 ${theme.click.flyout.space.content.x};
  `}
`;

const Element = (props: HTMLAttributes<HTMLDivElement>) => <FlyoutElement {...props} />;

Element.displayName = "Flyout.Element";
Flyout.Element = Element;

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

const FlyoutHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ${({ theme }) => `
    row-gap: ${theme.click.flyout.space.content["row-gap"]};
    column-gap: ${theme.click.flyout.space.content["column-gap"]};
    padding: 0 ${theme.click.flyout.space.content.x};
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
      <FlyoutContainer>
        <FlyoutHeaderContainer {...props}>
          <FlexGrow>{children}</FlexGrow>
          <Dialog.Close asChild>
            <IconButton
              icon="cross"
              type="ghost"
              size="xs"
            />
          </Dialog.Close>
        </FlyoutHeaderContainer>
        <Separator size="lg" />
      </FlyoutContainer>
    );
  }

  return (
    <FlyoutContainer>
      <FlyoutHeaderContainer {...props}>
        <FlexGrow>
          <FlyoutTitle>{title}</FlyoutTitle>
          {description && <FlyoutDescription>{description}</FlyoutDescription>}
        </FlexGrow>
        <Dialog.Close>
          <IconButton
            icon="cross"
            type="ghost"
            size="xs"
          />
        </Dialog.Close>
      </FlyoutHeaderContainer>
      <Separator size="lg" />
    </FlyoutContainer>
  );
};
Header.displayName = "Flyout.Header";
Flyout.Header = Header;

const FlyoutBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow: auto;
`;

const Body = (props: HTMLAttributes<HTMLDivElement>) => <FlyoutBody {...props} />;

Body.displayName = "Flyout.Body";
Flyout.Body = Body;

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  cancelText?: string;
  showClose?: boolean;
}

const FlyoutFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  ${({ theme }) => `
    row-gap: ${theme.click.flyout.space.content["row-gap"]};
    column-gap: ${theme.click.flyout.space.content["column-gap"]};
    padding: 0 ${theme.click.flyout.space.content.x};
  `}
`;

const Footer = ({ cancelText, showClose, children, ...props }: FooterProps) => {
  return (
    <FlyoutContainer>
      <Separator size="lg" />
      <FlyoutFooter {...props}>
        {showClose && (
          <Dialog.Close asChild>
            <Button type="secondary">{cancelText ?? "Cancel"}</Button>
          </Dialog.Close>
        )}
        {children}
      </FlyoutFooter>
    </FlyoutContainer>
  );
};
Footer.displayName = "Flyout.Footer";
Flyout.Footer = Footer;
