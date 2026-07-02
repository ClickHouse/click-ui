import * as RadixPopover from '@radix-ui/react-popover';
import { Arrow, GenericMenuPanel } from '@/components/GenericMenu';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { Icon } from '@/components/Icon';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import styles from './Popover.module.css';

export const Popover = ({ children, ...props }: RadixPopover.PopoverProps) => {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};

interface TriggerProps extends RadixPopover.PopoverTriggerProps {
  anchor?: ReactNode;
}

const PopoverTrigger = ({ anchor, children, ...props }: TriggerProps) => {
  return (
    <>
      <RadixPopover.Trigger
        asChild
        {...props}
      >
        <div className={styles.trigger}>{children}</div>
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

const _MenuPanel = <T extends ElementType = 'div'>(
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

const MenuPanel: MenuPanelComponent = forwardRef(_MenuPanel);

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
        {showClose && (
          <RadixPopover.Close
            asChild
            className={styles['close-button']}
          >
            <Icon name="cross" />
          </RadixPopover.Close>
        )}
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
      </MenuPanel>
    </RadixPopover.Portal>
  );
};
PopoverContent.displayName = 'PopoverContent';
Popover.Content = PopoverContent;
