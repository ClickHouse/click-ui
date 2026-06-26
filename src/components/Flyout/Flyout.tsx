import { CSSProperties, ReactNode, useMemo } from 'react';
import { useTheme } from 'styled-components';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { Button } from '@/components/Button';
import type { ButtonProps } from '@/components/Button';
import { CodeBlock } from '@/components/CodeBlock';
import { Container } from '@/components/Container';
import type { ContainerProps } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { Separator } from '@/components/Separator';
import { Spacer } from '@/components/Spacer';
import { CrossButton } from '@/components/CrossButton';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import { cn, cva } from '@/lib/cva';
import styles from './Flyout.module.css';
import type {
  FlyoutProps,
  FlyoutTriggerProps,
  FlyoutContentProps,
  FlyoutHeaderProps,
  FlyoutFooterProps,
  FlyoutType,
} from './Flyout.types';

export const Flyout = ({ modal = false, ...props }: FlyoutProps) => {
  return (
    <Dialog
      modal={modal}
      {...props}
    />
  );
};

const Trigger = ({ children, ...props }: FlyoutTriggerProps) => {
  return (
    <DialogTrigger asChild>
      <div {...props}>{children}</div>
    </DialogTrigger>
  );
};
Trigger.displayName = 'Flyout.Trigger';
Flyout.Trigger = Trigger;

const contentVariants = cva(styles.content, {
  variants: {
    type: {
      default: styles.content_type_default,
      inline: styles.content_type_inline,
    },
    strategy: {
      relative: styles.content_strategy_relative,
      absolute: styles.content_strategy_absolute,
      fixed: styles.content_strategy_fixed,
    },
    align: {
      start: styles.content_align_start,
      end: styles.content_align_end,
    },
    hasShadow: {
      true: '',
      false: styles['content_no-shadow'],
    },
  },
  defaultVariants: {
    type: 'default',
    align: 'end',
    hasShadow: true,
  },
});

const Content = ({
  showOverlay = false,
  children,
  container,
  strategy = 'relative',
  size = 'default',
  type = 'default',
  closeOnInteractOutside = false,
  width,
  align = 'end',
  hasShadow = true,
  onInteractOutside,
  className,
  style,
  ...props
}: FlyoutContentProps) => {
  const portalContainer = useResolvedPortalContainer(container);
  const theme = useTheme();

  const mergedStyle = useMemo(() => {
    // Resolve the default width from the typed theme so an invalid `size`
    // fails at compile time, rather than silently emitting a non-existent
    // CSS variable. A non-empty `width` prop always wins; `||` (matching the
    // pre-migration styled version) also falls back on an empty-string width.
    const resolvedWidth = width || theme.click.flyout.size[size].width;

    return {
      '--flyout-width': resolvedWidth,
      ...style,
    } as CSSProperties;
  }, [width, size, style, theme]);

  return (
    <DialogPortal container={portalContainer}>
      {showOverlay && <DialogOverlay className="DialogOverlay" />}
      <DialogContent
        onInteractOutside={e => {
          if (!closeOnInteractOutside) {
            e.preventDefault();
          }
          if (typeof onInteractOutside === 'function') {
            onInteractOutside(e);
          }
        }}
        {...props}
        style={mergedStyle}
        className={cn(contentVariants({ type, strategy, align, hasShadow }), className)}
      >
        {children}
      </DialogContent>
    </DialogPortal>
  );
};
Content.displayName = 'Flyout.Content';
Flyout.Content = Content;

const elementVariants = cva(styles.element, {
  variants: {
    type: {
      default: styles.element_type_default,
      inline: styles.element_type_inline,
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

interface ElementProps extends Omit<
  ContainerProps,
  'component' | 'padding' | 'gap' | 'orientation'
> {
  type?: FlyoutType;
  className?: string;
}

const Element = ({ type, className, ...props }: ElementProps) => (
  <Container
    orientation="vertical"
    padding="none"
    gap="none"
    {...props}
    className={cn(elementVariants({ type }), className)}
  />
);

Element.displayName = 'Flyout.Element';
Flyout.Element = Element;

const headerVariants = cva(styles.header, {
  variants: {
    type: {
      default: styles.header_type_default,
      inline: styles.header_type_inline,
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

const titleVariants = cva(styles.title, {
  variants: {
    type: {
      default: styles.title_type_default,
      inline: styles.title_type_inline,
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

const descriptionVariants = cva(styles.description, {
  variants: {
    type: {
      default: styles.description_type_default,
      inline: styles.description_type_inline,
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

const Header = ({
  title,
  description,
  type,
  children,
  showClose = true,
  showSeparator = true,
  className,
  ...props
}: FlyoutHeaderProps) => {
  if (children) {
    return (
      <div className={styles.container}>
        <Container
          justifyContent="space-between"
          alignItems="start"
          padding="none"
          gap="none"
          fillWidth={false}
          isResponsive={false}
          {...props}
          className={cn(headerVariants({ type }), className)}
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
    <div className={styles.container}>
      <Container
        justifyContent="space-between"
        alignItems="start"
        fillWidth={false}
        isResponsive={false}
        {...props}
        className={cn(headerVariants({ type }), className)}
      >
        <Container
          padding="none"
          gap="none"
          orientation="vertical"
          grow="1"
        >
          <DialogTitle className={cn(titleVariants({ type }))}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={cn(descriptionVariants({ type }))}>
              {description}
            </DialogDescription>
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
Header.displayName = 'Flyout.Header';
Flyout.Header = Header;

type FlyoutAlign = 'default' | 'top';

const bodyVariants = cva(styles.body, {
  variants: {
    align: {
      default: styles.body_align_default,
      top: styles.body_align_top,
    },
  },
  defaultVariants: {
    align: 'default',
  },
});

interface BodyProps extends ContainerProps {
  align?: FlyoutAlign;
  className?: string;
}

const Body = ({ align, className, ...props }: BodyProps) => (
  <Container
    overflow="auto"
    orientation="vertical"
    grow="1"
    {...props}
    className={cn(bodyVariants({ align }), className)}
  />
);

Body.displayName = 'Flyout.Body';
Flyout.Body = Body;

const footerVariants = cva(styles.footer, {
  variants: {
    type: {
      default: styles.footer_type_default,
      inline: styles.footer_type_inline,
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

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

const Footer = ({ type, className, ...props }: FlyoutFooterProps) => {
  return (
    <Container
      gap="none"
      orientation="vertical"
      alignItems="end"
      className={styles['footer-container']}
    >
      <Separator size="xs" />
      <Container
        justifyContent="end"
        gap="none"
        padding="none"
        isResponsive={false}
        wrap="wrap"
        {...props}
        className={cn(footerVariants({ type }), className)}
      />
    </Container>
  );
};
Footer.displayName = 'Flyout.Footer';
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
  className,
  ...props
}: FlyoutCodeBlockProps & ElementProps) => {
  return (
    <Element
      fillHeight
      {...props}
    >
      <CodeBlock
        className={cn(styles['code-block'], className)}
        wrapLines={wrapLines}
        language={language}
        showLineNumbers={showLineNumbers}
        showWrapButton={showWrapButton}
        onCopy={onCopy}
        onCopyError={onCopyError}
      >
        {statement}
      </CodeBlock>
      <Spacer size="xs" />
    </Element>
  );
};

Flyout.CodeBlock = FlyoutCodeBlock;
