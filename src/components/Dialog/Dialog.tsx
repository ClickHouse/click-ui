import * as RadixDialog from '@radix-ui/react-dialog';
import { Button, ButtonProps } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/components/Spacer';
import { CrossButton } from '@/components/CrossButton';
import { cn, cva } from '@/lib/cva';
import { DialogContentProps, DialogProps, DialogTriggerProps } from './Dialog.types';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import styles from './Dialog.module.css';

export const Dialog = ({ children, ...props }: DialogProps) => {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
};

// Dialog Trigger
const DialogTrigger = ({
  children,
  asChild,
  className,
  ...props
}: DialogTriggerProps) => {
  if (asChild) {
    // Pass all props to RadixDialog.Trigger, no styled wrapper
    return (
      <RadixDialog.Trigger
        asChild
        className={className}
        {...props}
      >
        {children}
      </RadixDialog.Trigger>
    );
  }
  // Default trigger styling when not using asChild
  return (
    <RadixDialog.Trigger
      {...props}
      className={cn(styles.trigger, className)}
    >
      {children}
    </RadixDialog.Trigger>
  );
};

DialogTrigger.displayName = 'DialogTrigger';
Dialog.Trigger = DialogTrigger;

const DialogClose = ({ label = 'Close', type = 'secondary', ...props }: ButtonProps) => (
  <RadixDialog.Close asChild>
    <Button
      type={type}
      label={label}
      {...props}
    />
  </RadixDialog.Close>
);

DialogClose.displayName = 'DialogClose';
Dialog.Close = DialogClose;

const contentAreaVariants = cva(styles.content, {
  variants: {
    reducePadding: {
      true: styles['content_reduce-padding'],
    },
  },
});

const titleAreaVariants = cva(styles['title-area'], {
  variants: {
    onlyClose: {
      true: styles['title-area_only-close'],
    },
  },
});

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

const DialogContent = ({
  title,
  description,
  children,
  showClose,
  onClose,
  forceMount,
  container,
  showOverlay = true,
  reducePadding = false,
  className,
  ...props
}: DialogContentProps) => {
  const portalContainer = useResolvedPortalContainer(container);

  return (
    <RadixDialog.Portal
      forceMount={forceMount}
      container={portalContainer}
    >
      {showOverlay && <RadixDialog.Overlay className={styles.overlay} />}
      <RadixDialog.Content
        data-testid="click-dialog-contentarea"
        {...props}
        className={cn(contentAreaVariants({ reducePadding }), className)}
      >
        {(title || showClose) && (
          <>
            <div className={cn(titleAreaVariants({ onlyClose: !!showClose && !title }))}>
              {title && (
                <RadixDialog.Title
                  data-testid="click-dialog-title"
                  className={styles.title}
                >
                  {title}
                </RadixDialog.Title>
              )}
              {showClose && (
                <CloseButton
                  data-testid="click-dialog-close"
                  onClose={onClose}
                />
              )}
            </div>
            <Spacer size="sm" />
          </>
        )}
        {description ? (
          <RadixDialog.Description className={styles.description}>
            {description}
          </RadixDialog.Description>
        ) : (
          <RadixDialog.Description hidden />
        )}
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

DialogContent.displayName = 'DialogContent';
Dialog.Content = DialogContent;
