"use client";

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
import clsx from "clsx";
import {
  Button,
  ButtonProps,
  CodeBlock,
  Container,
  ContainerProps,
  Icon,
  Separator,
  Spacer,
} from "@/components";
import { CrossButton } from "@/components/commonElement";
import styles from "./Flyout.module.scss";

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

type FlyoutSizeType = "default" | "narrow" | "wide" | "widest";
type Strategy = "relative" | "absolute" | "fixed";
type FlyoutType = "default" | "inline";

type DialogContentAlignmentType = "start" | "end";
export interface DialogContentProps extends RadixDialogContentProps {
  /** Container element to portal the flyout into */
  container?: HTMLElement | null;
  /** Whether to show the overlay backdrop */
  showOverlay?: boolean;
  /** The size variant of the flyout */
  size?: FlyoutSizeType;
  /** The type of flyout styling */
  type?: FlyoutType;
  /** CSS position strategy */
  strategy?: Strategy;
  /** Whether clicking outside closes the flyout */
  closeOnInteractOutside?: boolean;
  /** Custom width for the flyout */
  width?: string;
  /** Alignment of the flyout (start = left, end = right) */
  align?: DialogContentAlignmentType;
}

const Content = ({
  showOverlay = false,
  children,
  container,
  strategy = "relative",
  size = "default",
  type = "default",
  closeOnInteractOutside = false,
  width,
  align = "end",
  onInteractOutside,
  ...props
}: DialogContentProps) => {
  const customWidthStyle = width
    ? ({ "--flyout-width": width } as React.CSSProperties)
    : {};

  return (
    <DialogPortal container={container}>
      {showOverlay && <DialogOverlay className={styles.cuiFlyoutOverlay} />}
      <DialogContent
        className={clsx(styles.cuiFlyoutContent, {
          [styles.cuiSizeDefault]: size === "default" && !width,
          [styles.cuiSizeNarrow]: size === "narrow" && !width,
          [styles.cuiSizeWide]: size === "wide" && !width,
          [styles.cuiSizeWidest]: size === "widest" && !width,
          [styles.cuiCustomWidth]: !!width,
          [styles.cuiStrategyRelative]: strategy === "relative",
          [styles.cuiStrategyAbsolute]: strategy === "absolute",
          [styles.cuiStrategyFixed]: strategy === "fixed",
          [styles.cuiTypeDefault]: type === "default",
          [styles.cuiTypeInline]: type === "inline",
          [styles.cuiAlignStart]: align === "start",
          [styles.cuiAlignEnd]: align === "end",
        })}
        style={customWidthStyle}
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
      </DialogContent>
    </DialogPortal>
  );
};
Content.displayName = "Flyout.Content";
Flyout.Content = Content;

interface ElementProps extends Omit<
  ContainerProps,
  "component" | "padding" | "gap" | "orientation"
> {
  type?: FlyoutType;
}

const Element = ({ type = "default", ...props }: ElementProps) => (
  <Container
    orientation="vertical"
    padding="none"
    gap="none"
    className={clsx(styles.cuiFlyoutElement, {
      [styles.cuiTypeDefault]: type === "default",
      [styles.cuiTypeInline]: type === "inline",
    })}
    {...props}
  />
);

Element.displayName = "Flyout.Element";
Flyout.Element = Element;

interface TitleHeaderProps extends Omit<
  ContainerProps,
  | "orientaion"
  | "justifyContent"
  | "alignItems"
  | "component"
  | "padding"
  | "gap"
  | "children"
  | "fillWidth"
> {
  title: string;
  description?: string;
  type?: FlyoutType;
  children?: never;
  showClose?: boolean;
  showSeparator?: boolean;
}

interface ChildrenHeaderProps extends Omit<
  ContainerProps,
  | "orientaion"
  | "justifyContent"
  | "alignItems"
  | "component"
  | "padding"
  | "gap"
  | "fillWidth"
> {
  title?: never;
  type?: FlyoutType;
  description?: never;
  showClose?: boolean;
  showSeparator?: boolean;
}

export type FlyoutHeaderProps = TitleHeaderProps | ChildrenHeaderProps;

const Header = ({
  title,
  description,
  type = "default",
  children,
  showClose = true,
  showSeparator = true,
  ...props
}: FlyoutHeaderProps) => {
  if (children) {
    return (
      <div className={styles.cuiFlyoutContainer}>
        <Container
          className={clsx(styles.cuiFlyoutHeaderContainer, {
            [styles.cuiTypeDefault]: type === "default",
            [styles.cuiTypeInline]: type === "inline",
          })}
          justifyContent="space-between"
          alignItems="start"
          padding="none"
          gap="none"
          fillWidth={false}
          isResponsive={false}
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
          {showClose && (
            <DialogClose asChild>
              <CrossButton data-testid="flyout-header-close-btn">
                <Icon
                  name="cross"
                  size={type === "inline" ? "md" : "lg"}
                />
              </CrossButton>
            </DialogClose>
          )}
        </Container>
        {showSeparator && (
          <Separator
            data-testid="flyout-header-separator"
            size="lg"
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.cuiFlyoutContainer}>
      <Container
        className={clsx(styles.cuiFlyoutHeaderContainer, {
          [styles.cuiTypeDefault]: type === "default",
          [styles.cuiTypeInline]: type === "inline",
        })}
        justifyContent="space-between"
        alignItems="start"
        fillWidth={false}
        isResponsive={false}
        {...props}
      >
        <Container
          padding="none"
          gap="none"
          orientation="vertical"
          grow="1"
        >
          <DialogTitle
            className={clsx(styles.cuiFlyoutTitle, {
              [styles.cuiTypeDefault]: type === "default",
              [styles.cuiTypeInline]: type === "inline",
            })}
          >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription
              className={clsx(styles.cuiFlyoutDescription, {
                [styles.cuiTypeDefault]: type === "default",
                [styles.cuiTypeInline]: type === "inline",
              })}
            >
              {description}
            </DialogDescription>
          )}
        </Container>
        {showClose && (
          <DialogClose asChild>
            <CrossButton data-testid="flyout-header-close-btn">
              <Icon
                name="cross"
                size={type === "inline" ? "md" : "lg"}
              />
            </CrossButton>
          </DialogClose>
        )}
      </Container>
      {showSeparator && (
        <Separator
          data-testid="flyout-header-separator"
          size="lg"
        />
      )}
    </div>
  );
};
Header.displayName = "Flyout.Header";
Flyout.Header = Header;

type FlyoutAlign = "default" | "top";

interface BodyProps extends ContainerProps {
  align?: FlyoutAlign;
}

const Body = ({ align = "default", ...props }: BodyProps) => (
  <Container
    overflow="auto"
    orientation="vertical"
    grow="1"
    className={clsx(styles.cuiFlyoutBody, {
      [styles.cuiAlignTop]: align === "top",
      [styles.cuiAlignDefault]: align === "default",
    })}
    {...props}
  />
);

Body.displayName = "Flyout.Body";
Flyout.Body = Body;

export interface FlyoutFooterProps extends Omit<
  ContainerProps<"div">,
  "orientaion" | "justifyContent" | "component" | "padding" | "gap"
> {
  type?: FlyoutType;
}

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

const Footer = ({ type = "default", ...props }: FlyoutFooterProps) => {
  return (
    <Container
      gap="none"
      orientation="vertical"
      alignItems="end"
      className={styles.cuiFooterContainer}
    >
      <Separator size="xs" />
      <Container
        justifyContent="end"
        gap="none"
        padding="none"
        isResponsive={false}
        wrap="wrap"
        className={clsx(styles.cuiFlyoutFooter, {
          [styles.cuiTypeDefault]: type === "default",
          [styles.cuiTypeInline]: type === "inline",
        })}
        {...props}
      />
    </Container>
  );
};
Footer.displayName = "Flyout.Footer";
Flyout.Footer = Footer;

interface FlyoutCodeBlockProps extends ContainerProps {
  language?: string;
  statement: string;
  showLineNumbers?: boolean;
  showWrapButton?: boolean;
  wrapLines?: boolean;
  onCopy?: (value: string) => void | Promise<void>;
  onCopyError?: (error: string) => void | Promise<void>;
}

const FlyoutCodeBlock = ({
  statement,
  language,
  wrapLines,
  showLineNumbers,
  showWrapButton,
  onCopy,
  onCopyError,
  ...props
}: FlyoutCodeBlockProps & ElementProps) => {
  return (
    <Element
      fillHeight
      {...props}
    >
      <CodeBlock
        wrapLines={wrapLines}
        language={language}
        showLineNumbers={showLineNumbers}
        showWrapButton={showWrapButton}
        onCopy={onCopy}
        onCopyError={onCopyError}
        className={styles.cuiCustomCodeBlock}
      >
        {statement}
      </CodeBlock>
      <Spacer size="xs" />
    </Element>
  );
};

Flyout.CodeBlock = FlyoutCodeBlock;
