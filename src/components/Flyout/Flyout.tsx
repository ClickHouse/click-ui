import { HTMLAttributes, ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogProps,
  DialogTitle,
  DialogTrigger,
  DialogTriggerProps,
  DialogContentProps as RadixDialogContentProps,
} from "@radix-ui/react-dialog";
import { Button, ButtonProps, Icon, Separator } from "..";
import styled from "styled-components";
import { CrossButton } from "../commonElement";

export type FlyoutProps = DialogProps;

export const Flyout = ({ modal = false, ...props }: FlyoutProps) => {
  return (
    <Dialog
      modal={modal}
      {...props}
    />
  );
};

const Trigger = ({ children, ...props }: DialogTriggerProps) => {
  return (
    <DialogTrigger
      asChild
      {...props}
    >
      <div>{children}</div>
    </DialogTrigger>
  );
};
Trigger.displayName = "Flyout.Trigger";
Flyout.Trigger = Trigger;

type FlyoutSizeType = "default" | "narrow" | "wide";
type Strategy = "relative" | "absolute" | "fixed";
export interface DialogContentProps extends RadixDialogContentProps {
  container?: HTMLElement | null;
  showOverlay?: boolean;
  showClose?: boolean;
  size?: FlyoutSizeType;
  strategy?: Strategy;
  closeOnInteractOutside?: boolean;
}

const FlyoutContent = styled(DialogContent)<{
  $size?: FlyoutSizeType;
  $strategy: Strategy;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  flex: 1;
  top: 0;
  right: 0;
  bottom: 0;
  ${({ theme, $size = "default", $strategy }) => `
    position: ${$strategy};
    height: ${$strategy === "relative" ? "100%" : "auto"};
    width: ${theme.click.flyout.size[$size].width};
    padding: ${theme.click.flyout.space.y} ${theme.click.flyout.space.x};
    gap: ${theme.click.flyout.space.gap};
    border-left: 1px solid ${theme.click.flyout.color.stroke.default};
    background: ${theme.click.flyout.color.background.default};
    box-shadow: -6px 0px 10px 0px ${
      theme.click.flyout.shadow.default
    }, -5px 0px 20px 0px ${theme.click.flyout.shadow.default};
        @media (max-width: 1024px) {
    ${
      $strategy === "relative"
        ? `
          position: absolute !important;`
        : ""
    }
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
  `}
`;
const FlyoutContainer = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  flex-flow: column nowrap;
  gap: inherit;
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
    <DialogPortal container={container}>
      {showOverlay && <DialogOverlay className="DialogOverlay" />}
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
    </DialogPortal>
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
  description?: string;
  children?: never;
}

interface ChildrenHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: never;
  description?: never;
}

export type FlyoutHeaderProps = TitleHeaderProps | ChildrenHeaderProps;

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

const FlyoutTitle = styled(DialogTitle)`
  ${({ theme }) => `
    color: ${theme.click.flyout.color.title.default};
    font: ${theme.typography.styles.product.titles.xl};
    margin: 0;
    padding: 0;
  `}
`;

const FlyoutDescription = styled(DialogDescription)`
  ${({ theme }) => `
    color: ${theme.click.flyout.color.description.default};
    font: ${theme.typography.styles.product.text.normal.md};
    margin: 0;
    padding: 0;
  `}
`;

const Header = ({ title, description, children, ...props }: FlyoutHeaderProps) => {
  if (children) {
    return (
      <FlyoutContainer>
        <FlyoutHeaderContainer {...props}>
          <FlexGrow>{children}</FlexGrow>
          <DialogClose asChild>
            <CrossButton data-testid="flyout-header-close-btn">
              <Icon
                name="cross"
                size="lg"
              />
            </CrossButton>
          </DialogClose>
        </FlyoutHeaderContainer>
        <Separator size="xs" />
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
        <DialogClose asChild>
          <CrossButton data-testid="flyout-header-close-btn">
            <Icon
              name="cross"
              size="lg"
            />
          </CrossButton>
        </DialogClose>
      </FlyoutHeaderContainer>
      <Separator size="xs" />
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

export type FlyoutFooterProps = HTMLAttributes<HTMLDivElement>;

const FlyoutFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => `
    row-gap: ${theme.click.flyout.space.content["row-gap"]};
    column-gap: ${theme.click.flyout.space.content["column-gap"]};
    padding: 0 ${theme.click.flyout.space.content.x};
  `}
`;

interface FlyoutButtonProps extends Omit<ButtonProps, "children"> {
  children?: never;
}

const FlyoutClose = ({
  children,
  ...props
}: FlyoutButtonProps | { children?: ReactNode }) => {
  return (
    <DialogClose asChild>
      {children ?? (
        <Button
          type="secondary"
          {...props}
        />
      )}
    </DialogClose>
  );
};
FlyoutClose.displayName = "Flyout.Close";
Flyout.Close = FlyoutClose;

const Footer = (props: FlyoutFooterProps) => {
  return (
    <FlyoutContainer>
      <Separator size="xs" />
      <FlyoutFooter {...props} />
    </FlyoutContainer>
  );
};
Footer.displayName = "Flyout.Footer";
Flyout.Footer = Footer;
