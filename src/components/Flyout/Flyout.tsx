import { ReactNode } from "react";
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
import { Button, ButtonProps, Container, ContainerProps, Icon, Separator } from "..";
import styled from "styled-components";
import { CrossButton } from "../commonElement";
import { keyframes } from "styled-components";

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
type FlyoutType = "default" | "inline";

export interface DialogContentProps extends RadixDialogContentProps {
  container?: HTMLElement | null;
  showOverlay?: boolean;
  showClose?: boolean;
  size?: FlyoutSizeType;
  type?: FlyoutType;
  strategy?: Strategy;
  closeOnInteractOutside?: boolean;
}

const animationWidth = keyframes({
  "0%": { maxWidth: 0, minWidth: 0 },
  "100%": { maxWidth: "fit-content", minWidth: "var(--flyout-width, 100%)" },
});

const FlyoutContent = styled(DialogContent)<{
  $size?: FlyoutSizeType;
  $type?: FlyoutType;
  $strategy: Strategy;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  flex: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  --flyout-width: ${({ theme, $size = "default" }) =>
    theme.click.flyout.size[$size].width};
  animation: ${animationWidth} 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  ${({ theme, $strategy, $type = "default" }) => `
    position: ${$strategy};
    height: ${$strategy === "relative" ? "100%" : "auto"};
    padding: 0 ${theme.click.flyout.space[$type].x}
    gap: ${theme.click.flyout.space[$type].gap};
    border-left: 1px solid ${theme.click.flyout.color.stroke.default};
    background: ${theme.click.flyout.color.background.default};
    box-shadow: ${theme.click.flyout.shadow.default}};

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
  type = "default",
  closeOnInteractOutside = false,
  onInteractOutside,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPortal container={container}>
      {showOverlay && <DialogOverlay className="DialogOverlay" />}
      <FlyoutContent
        $size={size}
        $type={type}
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

const FlyoutElement = styled(Container)<{
  type?: FlyoutType;
}>`
  max-width: 100%;
  max-width: -webkit-fill-available;
  max-width: fill-available;
  max-width: stretch;
  ${({ theme, type = "default" }) => `
    gap: ${theme.click.flyout.space[type].gap};
    padding: 0 ${theme.click.flyout.space[type].content.x};
  `}
`;

interface ElementProps
  extends Omit<ContainerProps<"div">, "component" | "padding" | "gap" | "orientation"> {
  type?: FlyoutType;
}

const Element = ({ type, ...props }: ElementProps) => (
  <FlyoutElement
    orientation="vertical"
    padding="none"
    gap="none"
    type={type}
    {...props}
  />
);

Element.displayName = "Flyout.Element";
Flyout.Element = Element;

interface TitleHeaderProps
  extends Omit<
    ContainerProps<"div">,
    | "orientaion"
    | "justifyContent"
    | "alignItems"
    | "component"
    | "padding"
    | "gap"
    | "children"
    | "width"
  > {
  title: string;
  description?: string;
  type?: FlyoutType;
  children?: never;
}

interface ChildrenHeaderProps
  extends Omit<
    ContainerProps<"div">,
    | "orientaion"
    | "justifyContent"
    | "alignItems"
    | "component"
    | "padding"
    | "gap"
    | "width"
  > {
  title?: never;
  type?: FlyoutType;
  description?: never;
}

export type FlyoutHeaderProps = TitleHeaderProps | ChildrenHeaderProps;

const FlyoutHeaderContainer = styled(Container)<{
  type?: FlyoutType;
}>`
  ${({ theme, type = "default" }) => `
    row-gap: ${theme.click.flyout.space[type].content["row-gap"]};
    column-gap: ${theme.click.flyout.space[type].content["column-gap"]};
    padding: ${theme.click.flyout.space[type].y} ${theme.click.flyout.space[type].y} 0 ${theme.click.flyout.space[type].y} ;
  `}
`;

const FlyoutTitle = styled(DialogTitle)<{
  type?: FlyoutType;
}>`
  ${({ theme, type = "default" }) => `
    color: ${theme.click.flyout.color.title.default};
    font: ${theme.click.flyout.typography[type].title.default};
    margin: 0;
    padding: 0;
  `}
`;

const FlyoutDescription = styled(DialogDescription)<{
  type?: FlyoutType;
}>`
  ${({ theme, type = "default" }) => `
    color: ${theme.click.flyout.color.description.default};
    font: ${theme.click.flyout.typography[type].description.default};
    margin: 0;
    padding: 0;
  `}
`;

const Header = ({ title, description, type, children, ...props }: FlyoutHeaderProps) => {
  if (children) {
    return (
      <FlyoutContainer>
        <FlyoutHeaderContainer
          type={type}
          justifyContent="space-between"
          alignItems="start"
          padding="none"
          gap="none"
          width="auto"
          {...props}
        >
          <Container
            padding="none"
            gap="none"
            orientation="vertical"
            grow="1"
          >
            {children}
          </Container>
          <DialogClose asChild>
            <CrossButton data-testid="flyout-header-close-btn">
              <Icon
                name="cross"
                size="lg"
              />
            </CrossButton>
          </DialogClose>
        </FlyoutHeaderContainer>
        <Separator size="lg" />
      </FlyoutContainer>
    );
  }

  return (
    <FlyoutContainer>
      <FlyoutHeaderContainer
        type={type}
        justifyContent="space-between"
        alignItems="start"
        width="auto"
        {...props}
      >
        <Container
          padding="none"
          gap="none"
          orientation="vertical"
          grow="1"
        >
          <FlyoutTitle>{title}</FlyoutTitle>
          {description && <FlyoutDescription>{description}</FlyoutDescription>}
        </Container>
        <DialogClose asChild>
          <CrossButton data-testid="flyout-header-close-btn">
            <Icon
              name="cross"
              size="lg"
            />
          </CrossButton>
        </DialogClose>
      </FlyoutHeaderContainer>
      <Separator size="lg" />
    </FlyoutContainer>
  );
};
Header.displayName = "Flyout.Header";
Flyout.Header = Header;

type FlyoutAlign = "default" | "top";
const FlyoutBody = styled(Container)<{ $align?: FlyoutAlign }>`
  margin-top: ${({ $align = "default" }) => ($align === "top" ? "-1rem" : 0)};
`;

interface BodyProps extends ContainerProps<"div"> {
  align?: FlyoutAlign;
}

const Body = ({ align, ...props }: BodyProps) => (
  <FlyoutBody
    overflow="auto"
    orientation="vertical"
    grow="1"
    $align={align}
    {...props}
  />
);

Body.displayName = "Flyout.Body";
Flyout.Body = Body;

export interface FlyoutFooterProps
  extends Omit<
    ContainerProps<"div">,
    "orientaion" | "justifyContent" | "component" | "padding" | "gap"
  > {
  type?: FlyoutType;
}

const FlyoutFooter = styled(Container)<{
  type?: FlyoutType;
}>`
  ${({ theme, type = "default" }) => `
    row-gap: ${theme.click.flyout.space[type].content["row-gap"]};
    column-gap: ${theme.click.flyout.space[type].content["column-gap"]};
    padding: ${theme.click.flyout.space[type].y} ${theme.click.flyout.space[type].content.x};
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
    <Container gap="none">
      <Separator size="xs" />
      <FlyoutFooter
        justifyContents="end"
        gap="none"
        padding="none"
        {...props}
      />
    </Container>
  );
};
Footer.displayName = "Flyout.Footer";
Flyout.Footer = Footer;
