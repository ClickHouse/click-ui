import { ReactNode } from 'react';
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
} from '@radix-ui/react-dialog';
import { Button } from '@/components/Button';
import type { ButtonProps } from '@/components/Button';
import { CodeBlock } from '@/components/CodeBlock';
import { Container } from '@/components/Container';
import type { ContainerProps } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { Separator } from '@/components/Separator';
import { Spacer } from '@/components/Spacer';
import { styled } from 'styled-components';
import { CrossButton } from '../commonElement';
import { keyframes } from 'styled-components';

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
Trigger.displayName = 'Flyout.Trigger';
Flyout.Trigger = Trigger;

type FlyoutSizeType = 'default' | 'narrow' | 'wide' | 'widest';
type Strategy = 'relative' | 'absolute' | 'fixed';
type FlyoutType = 'default' | 'inline';

type DialogContentAlignmentType = 'start' | 'end';
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

const animationWidth = () =>
  keyframes({
    from: { width: 0 },
    to: { width: 'fit-content' },
  });

const FlyoutContent = styled(DialogContent)<{
  $size?: FlyoutSizeType;
  $type?: FlyoutType;
  $strategy: Strategy;
  $width?: string;
  $align: DialogContentAlignmentType;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  top: 0;
  bottom: 0;
  width: fit-content;
  --flyout-width: ${({ theme, $size = 'default', $width }) =>
    $width || theme.click.flyout.size[$size].width};
  animation: ${animationWidth} 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  ${({ theme, $strategy, $type = 'default', $align }) => `
    ${$align === 'start' ? 'left' : 'right'}: 0;
    max-width: 100%;
    position: ${$strategy};
    height: ${$strategy === 'relative' ? '100%' : 'auto'};
    padding: 0 ${theme.click.flyout.space[$type].x}
    gap: ${theme.click.flyout.space[$type].gap};
    box-shadow: ${
      $align === 'start'
        ? theme.click.flyout.shadow.reverse
        : theme.click.flyout.shadow.default
    };
    border-${$align === 'start' ? 'right' : 'left'}: 1px solid ${
      theme.click.flyout.color.stroke.default
    };
    background: ${theme.click.flyout.color.background.default};

    @media (max-width: 1024px) {
      ${
        $strategy === 'relative'
          ? `
            position: absolute !important;`
          : ''
      }
      overflow: hidden;
      transform: ${
        $align === 'start'
          ? 'translateX(calc(50px - 100%))'
          : 'translateX(calc(100% - 50px))'
      };
      transition: 0.3s ease-in-out;
      &:hover,
      &.active,
      &:focus-within {
        transform: translateX(0);
        ${$align === 'start' ? 'right' : 'left'}: auto;
      }
    }
  `}
`;
const FlyoutContainer = styled.div`
  display: flex;
  gap: 0;
  width: var(--flyout-width);
  max-width: 100%;
  flex-flow: column nowrap;
  gap: inherit;
`;

const Content = ({
  showOverlay = false,
  children,
  container,
  strategy = 'relative',
  size,
  type = 'default',
  closeOnInteractOutside = false,
  width,
  align = 'end',
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
          if (typeof onInteractOutside === 'function') {
            onInteractOutside(e);
          }
        }}
        $width={width}
        $align={align}
        {...props}
      >
        {children}
      </FlyoutContent>
    </DialogPortal>
  );
};
Content.displayName = 'Flyout.Content';
Flyout.Content = Content;

const FlyoutElement = styled(Container)<{
  $type?: FlyoutType;
}>`
  max-width: 100%;
  max-width: -webkit-fill-available;
  max-width: fill-available;
  max-width: stretch;
  ${({ theme, $type = 'default' }) => `
    gap: ${theme.click.flyout.space[$type].gap};
    padding: 0 ${theme.click.flyout.space[$type].content.x};
  `}
`;

interface ElementProps extends Omit<
  ContainerProps,
  'component' | 'padding' | 'gap' | 'orientation'
> {
  type?: FlyoutType;
}

const Element = ({ type, ...props }: ElementProps) => (
  <FlyoutElement
    orientation="vertical"
    padding="none"
    gap="none"
    $type={type}
    {...props}
  />
);

Element.displayName = 'Flyout.Element';
Flyout.Element = Element;

interface TitleHeaderProps extends Omit<
  ContainerProps,
  | 'orientaion'
  | 'justifyContent'
  | 'alignItems'
  | 'component'
  | 'padding'
  | 'gap'
  | 'children'
  | 'fillWidth'
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
  | 'orientaion'
  | 'justifyContent'
  | 'alignItems'
  | 'component'
  | 'padding'
  | 'gap'
  | 'fillWidth'
> {
  title?: never;
  type?: FlyoutType;
  description?: never;
  showClose?: boolean;
  showSeparator?: boolean;
}

export type FlyoutHeaderProps = TitleHeaderProps | ChildrenHeaderProps;

const FlyoutHeaderContainer = styled(Container)<{
  $type?: FlyoutType;
}>`
  ${({ theme, $type = 'default' }) => `
    row-gap: ${theme.click.flyout.space[$type].content['row-gap']};
    column-gap: ${theme.click.flyout.space[$type].content['column-gap']};
    padding: ${theme.click.flyout.space[$type].y} ${theme.click.flyout.space[$type].y} 0 ${theme.click.flyout.space[$type].y} ;
  `}
`;

const FlyoutTitle = styled(DialogTitle)<{
  $type?: FlyoutType;
}>`
  ${({ theme, $type = 'default' }) => `
    color: ${theme.click.flyout.color.title.default};
    font: ${theme.click.flyout.typography[$type].title.default};
    margin: 0;
    padding: 0;
  `}
`;

const FlyoutDescription = styled(DialogDescription)<{
  $type?: FlyoutType;
}>`
  ${({ theme, $type = 'default' }) => `
    color: ${theme.click.flyout.color.description.default};
    font: ${theme.click.flyout.typography[$type].description.default};
    margin: 0;
    padding: 0;
  `}
`;

const Header = ({
  title,
  description,
  type,
  children,
  showClose = true,
  showSeparator = true,
  ...props
}: FlyoutHeaderProps) => {
  if (children) {
    return (
      <FlyoutContainer>
        <FlyoutHeaderContainer
          $type={type}
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
                  size={type === 'inline' ? 'md' : 'lg'}
                />
              </CrossButton>
            </DialogClose>
          )}
        </FlyoutHeaderContainer>
        {showSeparator && (
          <Separator
            data-testid="flyout-header-separator"
            size="lg"
          />
        )}
      </FlyoutContainer>
    );
  }

  return (
    <FlyoutContainer>
      <FlyoutHeaderContainer
        $type={type}
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
          <FlyoutTitle $type={type}>{title}</FlyoutTitle>
          {description && (
            <FlyoutDescription $type={type}>{description}</FlyoutDescription>
          )}
        </Container>
        {showClose && (
          <DialogClose asChild>
            <CrossButton data-testid="flyout-header-close-btn">
              <Icon
                name="cross"
                size={type === 'inline' ? 'md' : 'lg'}
              />
            </CrossButton>
          </DialogClose>
        )}
      </FlyoutHeaderContainer>
      {showSeparator && (
        <Separator
          data-testid="flyout-header-separator"
          size="lg"
        />
      )}
    </FlyoutContainer>
  );
};
Header.displayName = 'Flyout.Header';
Flyout.Header = Header;

type FlyoutAlign = 'default' | 'top';
const FlyoutBody = styled(Container)<{ $align?: FlyoutAlign }>`
  width: var(--flyout-width);
  max-width: 100%;
  margin-top: ${({ $align = 'default' }) => ($align === 'top' ? '-1rem' : 0)};
`;

interface BodyProps extends ContainerProps {
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

Body.displayName = 'Flyout.Body';
Flyout.Body = Body;

export interface FlyoutFooterProps extends Omit<
  ContainerProps<'div'>,
  'orientaion' | 'justifyContent' | 'component' | 'padding' | 'gap'
> {
  type?: FlyoutType;
}

const FlyoutFooter = styled(Container)<{
  type?: FlyoutType;
}>`
  ${({ theme, type = 'default' }) => `
    row-gap: ${theme.click.flyout.space[type].content['row-gap']};
    column-gap: ${theme.click.flyout.space[type].content['column-gap']};
    padding: ${theme.click.flyout.space[type].y} ${theme.click.flyout.space[type].content.x};
  `}
`;

interface FlyoutButtonProps extends Omit<ButtonProps, 'children'> {
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
FlyoutClose.displayName = 'Flyout.Close';
Flyout.Close = FlyoutClose;

const FooterContainer = styled(Container)`
  width: var(--flyout-width);
  max-width: 100%;
`;

const Footer = (props: FlyoutFooterProps) => {
  return (
    <FooterContainer
      gap="none"
      orientation="vertical"
      alignItems="end"
    >
      <Separator size="xs" />
      <FlyoutFooter
        justifyContent="end"
        gap="none"
        padding="none"
        isResponsive={false}
        wrap="wrap"
        {...props}
      />
    </FooterContainer>
  );
};
Footer.displayName = 'Flyout.Footer';
Flyout.Footer = Footer;

const CustomCodeBlock = styled(CodeBlock)`
  display: flex;
  height: 100%;
  pre {
    flex: 1;
    overflow-wrap: break-word;
    code {
      display: inline-block;
      max-width: calc(100% - 1rem);
    }
  }
`;

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
      <CustomCodeBlock
        wrapLines={wrapLines}
        language={language}
        showLineNumbers={showLineNumbers}
        showWrapButton={showWrapButton}
        onCopy={onCopy}
        onCopyError={onCopyError}
      >
        {statement}
      </CustomCodeBlock>
      <Spacer size="xs" />
    </Element>
  );
};

Flyout.CodeBlock = FlyoutCodeBlock;
