import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slottable } from '@radix-ui/react-slot';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  Fragment,
  ReactNode,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from 'react';
import { Button } from '@/components/Button';
import { Arrow, GenericMenuItem, GenericMenuPanel } from '@/components/GenericMenu';
import { cn } from '@/lib/cva';
import { useNonPointerClick, useInputModality } from '@/hooks/internal';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';
import { IconWrapper } from '@/components/IconWrapper';
import type { IconWrapperProps } from '@/components/IconWrapper';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/Icon';
import type { HorizontalDirection } from '@/types';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import type { ArrowProps, DropdownItemProps } from './Dropdown.types';
import styles from './Dropdown.module.css';

// Workaround for radix-ui/primitives#1963: Radix keeps its open state to itself, so Dropdown owns it to let the trigger open the menu on a click without a pointer press.
const DropdownOpenContext = createContext<((open: boolean) => void) | null>(null);

export const Dropdown = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: DropdownMenu.DropdownMenuProps) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: 'Dropdown',
  });

  return (
    <DropdownOpenContext.Provider value={setOpen}>
      <DropdownMenu.Root
        {...props}
        open={open}
        onOpenChange={setOpen}
      />
    </DropdownOpenContext.Provider>
  );
};

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

// `sub` alone discriminates the two shapes of Trigger and Content. The label
// fields live separately so only the sub-trigger accepts them — Content spreads
// what it does not read straight onto the Radix element, i.e. into the DOM.
interface SubDiscriminant {
  sub?: true;
}

interface SubTriggerFields {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  /**
   * Positions the tooltip shown when the label is truncated. Defaults to
   * `side: 'right'` so the tooltip does not cover the items above it.
   */
  tooltipProps?: IconWrapperProps['tooltipProps'];
}

interface MainDropdownProps {
  sub?: never;
}

type DropdownSubTriggerProps = DropdownMenu.DropdownMenuSubTriggerProps &
  SubDiscriminant &
  SubTriggerFields;
type DropdownTriggerProps = DropdownMenu.DropdownMenuTriggerProps &
  MainDropdownProps & {
    /** Defaults to `true` for a single element child, which then becomes the menu button and must forward its ref and props to a focusable element; `false` wraps `children` in a button. */
    asChild?: DropdownMenu.DropdownMenuTriggerProps['asChild'];
  };

const DropdownTrigger = ({
  sub,
  children,
  ...props
}: DropdownSubTriggerProps | DropdownTriggerProps) => {
  if (sub) {
    const { icon, iconDir, tooltipProps, ...menuProps } =
      props as DropdownSubTriggerProps;
    return (
      <DropdownMenuItem
        as={DropdownMenu.SubTrigger}
        {...menuProps}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
          tooltipProps={{ side: 'right', ...tooltipProps }}
        >
          {children}
        </IconWrapper>
        <Icon name="chevron-right" />
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMainTrigger {...(props as DropdownTriggerProps)}>
      {children}
    </DropdownMainTrigger>
  );
};

const DropdownMainTrigger = ({
  asChild,
  children,
  className,
  disabled,
  onClick,
  onPointerDown,
  type,
  ...triggerProps
}: DropdownTriggerProps) => {
  const setOpen = useContext(DropdownOpenContext);
  const nonPointerClickHandlers = useNonPointerClick<HTMLButtonElement>({
    onNonPointerClick: () => {
      if (!disabled && setOpen) {
        setOpen(true);
      }
    },
    onPointerDown,
    onClick,
  });

  const sharedProps = {
    disabled,
    'aria-disabled': disabled || undefined,
    ...nonPointerClickHandlers,
    ...triggerProps,
  };

  if (asChild !== false && isValidElement(children) && children.type !== Fragment) {
    return (
      <DropdownMenu.Trigger
        asChild
        // Radix sets type="button" on its trigger, which a click-ui Button reads as its variant.
        type={type ?? (children.type === 'button' ? 'button' : undefined)}
        // A click-ui Button takes its native type from htmlType and submits forms without it.
        {...(children.type === Button ? { htmlType: 'button' } : {})}
        {...sharedProps}
        className={className}
      >
        {children}
      </DropdownMenu.Trigger>
    );
  }

  return (
    <DropdownMenu.Trigger
      type={type ?? 'button'}
      {...sharedProps}
      className={cn(styles['dropdown-trigger'], className)}
    >
      {children}
    </DropdownMenu.Trigger>
  );
};

DropdownTrigger.displayName = 'DropdownTrigger';
Dropdown.Trigger = DropdownTrigger;

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

type DropdownContentProps = StyledDropdownContentProps & SubDiscriminant & ArrowProps;
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

// DropdownMenu.Sub renders no DOM node, so it takes only Radix's sub-menu props.
const DropdownSub = (props: DropdownMenu.DropdownMenuSubProps) => {
  return <DropdownMenu.Sub {...props} />;
};

DropdownSub.displayName = 'DropdownSub';
Dropdown.Sub = DropdownSub;

const DropdownItem = ({
  icon,
  iconDir,
  type = 'default',
  tooltipProps,
  ...props
}: DropdownItemProps) => {
  const renderLabel = (label: ReactNode) => (
    <IconWrapper
      icon={icon}
      iconDir={iconDir}
      tooltipProps={{ side: 'right', ...tooltipProps }}
    >
      {label}
    </IconWrapper>
  );

  return (
    <DropdownMenuItem
      as={DropdownMenu.Item}
      type={type}
      {...props}
    >
      <Slottable child={props.children}>{renderLabel}</Slottable>
    </DropdownMenuItem>
  );
};

DropdownItem.displayName = 'DropdownItem';
Dropdown.Item = DropdownItem;

export default Dropdown;
