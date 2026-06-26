import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { Arrow, GenericMenuItem, GenericMenuPanel } from '@/components/GenericMenu';
import { cn } from '@/lib/cva';
import { useInputModality } from '@/hooks/internal';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';
import { IconWrapper } from '@/components/IconWrapper';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/Icon';
import type { HorizontalDirection } from '@/types';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import styles from './Dropdown.module.css';

export const Dropdown = (props: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root {...props} />
);

type DropdownMenuItemComponent = <T extends ElementType = 'div'>(
  props: ComponentProps<typeof GenericMenuItem<T>>
) => ReactNode;

const _DropdownMenuItem = <T extends ElementType = 'div'>(
  { className, ...props }: ComponentProps<typeof GenericMenuItem<T>>,
  ref: ComponentPropsWithRef<T>['ref']
) => (
  <GenericMenuItem
    ref={ref}
    {...(props as ComponentProps<typeof GenericMenuItem>)}
    className={cn(styles['dropdown-menu-item'], className)}
  />
);

const DropdownMenuItem: DropdownMenuItemComponent = forwardRef(_DropdownMenuItem);

interface SubDropdownProps {
  sub?: true;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

interface MainDropdownProps {
  sub?: never;
}

type DropdownSubTriggerProps = DropdownMenu.DropdownMenuSubTriggerProps &
  SubDropdownProps;
type DropdownTriggerProps = DropdownMenu.DropdownMenuTriggerProps & MainDropdownProps;

const DropdownTrigger = ({
  sub,
  children,
  ...props
}: DropdownSubTriggerProps | DropdownTriggerProps) => {
  if (sub) {
    const { icon, iconDir, ...menuProps } = props as DropdownSubTriggerProps;
    return (
      <DropdownMenuItem
        as={DropdownMenu.SubTrigger}
        {...menuProps}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {children}
        </IconWrapper>
        <Icon name="chevron-right" />
      </DropdownMenuItem>
    );
  }

  const { className, ...triggerProps } = props as DropdownTriggerProps;
  return (
    <DropdownMenu.Trigger
      asChild
      {...triggerProps}
      className={cn(styles['dropdown-trigger'], className)}
    >
      <div>{children}</div>
    </DropdownMenu.Trigger>
  );
};

DropdownTrigger.displayName = 'DropdownTrigger';
Dropdown.Trigger = DropdownTrigger;

export type ArrowProps = {
  showArrow?: boolean;
};

interface StyledDropdownContentProps extends DropdownMenu.DropdownMenuContentProps {
  children?: ReactNode;
  container?: HTMLElement | null;
  responsivePositioning?: boolean;
}

interface StyledDropdownSubContentProps extends DropdownMenu.DropdownMenuSubContentProps {
  children?: ReactNode;
  container?: HTMLElement | null;
  responsivePositioning?: boolean;
}

type DropdownContentProps = StyledDropdownContentProps & SubDropdownProps & ArrowProps;
type DropdownSubContentProps = StyledDropdownSubContentProps &
  MainDropdownProps &
  ArrowProps;

type DropdownMenuContentComponent = <T extends ElementType = 'div'>(
  props: ComponentProps<typeof GenericMenuPanel<T>>
) => ReactNode;

const _DropdownMenuContent = <T extends ElementType = 'div'>(
  { className, ...props }: ComponentProps<typeof GenericMenuPanel<T>>,
  ref: ComponentPropsWithRef<T>['ref']
) => (
  <GenericMenuPanel
    ref={ref}
    {...(props as ComponentProps<typeof GenericMenuPanel>)}
    className={cn(styles['dropdown-menu-content'], className)}
  />
);

const DropdownMenuContent: DropdownMenuContentComponent =
  forwardRef(_DropdownMenuContent);

const DropdownContent = ({
  sub,
  children,
  container,
  showArrow,
  responsivePositioning = true,
  ...props
}: DropdownContentProps | DropdownSubContentProps) => {
  const ContentElement = sub ? DropdownMenu.SubContent : DropdownMenu.Content;
  const inputModalityProps = useInputModality();
  const portalContainer = useResolvedPortalContainer(container);

  return (
    <DropdownMenu.Portal container={portalContainer}>
      <DropdownMenuContent
        {...props}
        type="dropdown-menu"
        showArrow={showArrow}
        as={ContentElement}
        sideOffset={4}
        loop
        avoidCollisions={responsivePositioning}
        collisionPadding={responsivePositioning ? 100 : undefined}
        {...inputModalityProps}
      >
        {showArrow && (
          <Arrow
            asChild
            as={DropdownMenu.Arrow}
            width={20}
            height={10}
          >
            <Popover_Arrow />
          </Arrow>
        )}
        {children}
      </DropdownMenuContent>
    </DropdownMenu.Portal>
  );
};

DropdownContent.displayName = 'DropdownContent';
Dropdown.Content = DropdownContent;

const DropdownGroup = ({ className, ...props }: DropdownMenu.DropdownMenuGroupProps) => {
  return (
    <DropdownMenu.Group
      {...props}
      className={cn(styles['dropdown-group'], className)}
    />
  );
};

DropdownGroup.displayName = 'DropdownGroup';
Dropdown.Group = DropdownGroup;

// DropdownMenu.Sub is a context-only Radix primitive that renders no DOM node, so
// the original styled(DropdownMenu.Sub) border-bottom never applied (the className
// was dropped). The migration preserves that behavior: no class is forwarded.
const DropdownSub = (props: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenu.Sub {...props} />;
};

DropdownSub.displayName = 'DropdownSub';
Dropdown.Sub = DropdownSub;

interface DropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  /** Icon to display in the menu item */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The type of the menu item */
  type?: 'default' | 'danger';
}

export type { DropdownItemProps };

const DropdownItem = ({
  icon,
  iconDir,
  type = 'default',
  children,
  ...props
}: DropdownItemProps) => {
  return (
    <DropdownMenuItem
      as={DropdownMenu.Item}
      type={type}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {children}
      </IconWrapper>
    </DropdownMenuItem>
  );
};

DropdownItem.displayName = 'DropdownItem';
Dropdown.Item = DropdownItem;

export default Dropdown;
