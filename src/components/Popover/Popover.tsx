import * as RadixPopover from '@radix-ui/react-popover';
import { Arrow, GenericMenuPanel } from '@/components/GenericMenu';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
  isValidElement,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import styles from './Popover.module.css';

export const Popover = ({ children, ...props }: RadixPopover.PopoverProps) => {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};

interface TriggerProps extends RadixPopover.PopoverTriggerProps {
  anchor?: ReactNode;
  /**
   * Use the single child element as the trigger instead of wrapping it in a
   * `div`. The child must be focusable and forward `ref` and props.
   */
  asChild?: boolean;
}

const PopoverTrigger = ({ anchor, asChild, children, type, ...props }: TriggerProps) => {
  const child = asChild && isValidElement(children) ? children.type : undefined;
  // Radix sets `type="button"` on its trigger. With `asChild` it would land on the child, where a
  // click-ui `Button` or `IconButton` reads `type` as its variant and takes its native type from `htmlType`.
  const typeProps =
    child === Button || child === IconButton
      ? { type: undefined, htmlType: type ?? 'button' }
      : { type: type ?? (!asChild || child === 'button' ? 'button' : undefined) };

  return (
    <>
      <RadixPopover.Trigger
        // `asChild={false}` keeps rendering Radix's own button around the wrapper.
        asChild={asChild !== false}
        {...typeProps}
        {...props}
      >
        {asChild ? children : <div className={styles.trigger}>{children}</div>}
      </RadixPopover.Trigger>
      {anchor && <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>}
    </>
  );
};
PopoverTrigger.displayName = 'PopoverTrigger';
Popover.Trigger = PopoverTrigger;

interface PopoverContentProps extends RadixPopover.PopoverContentProps {
  /** Whether to show an arrow pointing to the trigger element */
  showArrow?: boolean;
  /** Whether to show a close button in the popover */
  showClose?: boolean;
  /** Forces the popover to mount in the DOM even when closed */
  forceMount?: true;
  /** Custom container element for the popover portal */
  container?: HTMLElement | null;
}

const menuPanelVariants = cva(styles['menu-panel'], {
  variants: {
    showClose: {
      true: styles['menu-panel_show-close'],
      false: '',
    },
  },
  defaultVariants: {
    showClose: false,
  },
});

type MenuPanelComponent = <T extends ElementType = 'div'>(
  props: ComponentProps<typeof GenericMenuPanel<T>> & { showClose?: boolean }
) => ReactNode;

const MenuPanelRender = <T extends ElementType = 'div'>(
  {
    showClose,
    className,
    ...props
  }: ComponentProps<typeof GenericMenuPanel<T>> & { showClose?: boolean },
  ref: ComponentPropsWithRef<T>['ref']
) => (
  <GenericMenuPanel
    ref={ref}
    {...(props as ComponentProps<typeof GenericMenuPanel>)}
    className={cn(menuPanelVariants({ showClose }), className)}
  />
);

const MenuPanel: MenuPanelComponent = forwardRef(MenuPanelRender);

const PopoverContent = ({
  children,
  showArrow,
  showClose,
  forceMount,
  container,
  ...props
}: PopoverContentProps) => {
  const portalContainer = useResolvedPortalContainer(container);

  return (
    <RadixPopover.Portal
      forceMount={forceMount}
      container={portalContainer}
    >
      <MenuPanel
        as={RadixPopover.Content}
        type="popover"
        showClose={showClose}
        showArrow={showArrow}
        sideOffset={4}
        {...props}
      >
        {showArrow && (
          <Arrow
            asChild
            as={RadixPopover.Arrow}
            width={20}
            height={10}
          >
            <Popover_Arrow />
          </Arrow>
        )}
        {children}
        {/* Rendered last so it takes focus after the panel's interactive elements */}
        {showClose && (
          <RadixPopover.Close asChild>
            <IconButton
              className={styles['close-button']}
              icon="cross"
              type="ghost"
              size="sm"
              aria-label="Close"
            />
          </RadixPopover.Close>
        )}
      </MenuPanel>
    </RadixPopover.Portal>
  );
};
PopoverContent.displayName = 'PopoverContent';
Popover.Content = PopoverContent;
