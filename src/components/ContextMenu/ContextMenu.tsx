import * as RightMenu from '@radix-ui/react-context-menu';
import { styled } from 'styled-components';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import type { HorizontalDirection } from '@/types';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/Icon';
import { Arrow, GenericMenuItem, GenericMenuPanel } from '@/components/GenericMenu';
import { cn, cva } from '@/lib/cva';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';
import { IconWrapper } from '@/components/IconWrapper/IconWrapper';
import { useInputModality } from '@/hooks/internal';
import type { ArrowProps, ContextMenuItemProps } from './ContextMenu.types';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import styles from './ContextMenu.module.css';

export const ContextMenu = (props: RightMenu.ContextMenuProps) => (
  <RightMenu.Root {...props} />
);

const TriggerDiv = styled.div`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.click.global.color.outline.default};
    outline-offset: 2px;
  }
`;

const ContextMenuTrigger = forwardRef<HTMLDivElement, RightMenu.ContextMenuTriggerProps>(
  ({ disabled, ...props }, ref) => {
    return (
      <RightMenu.Trigger
        asChild
        disabled={disabled}
      >
        <TriggerDiv
          ref={ref}
          {...props}
        />
      </RightMenu.Trigger>
    );
  }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';
ContextMenu.Trigger = ContextMenuTrigger;

interface ContextMenuSubTriggerProps extends RightMenu.ContextMenuSubTriggerProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
}
const ContextMenuSubTrigger = ({
  icon,
  iconDir,
  children,
  ...props
}: ContextMenuSubTriggerProps) => {
  return (
    <GenericMenuItem
      as={RightMenu.SubTrigger}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {children}
      </IconWrapper>
      <div className="dropdown-arrow">
        <Icon name="chevron-right" />
      </div>
    </GenericMenuItem>
  );
};

ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';
ContextMenu.SubTrigger = ContextMenuSubTrigger;

type DeprecatedFields = {
  /** @deprecated The side field have been deprecated. See https://github.com/ClickHouse/click-ui/pull/756/files#diff-801534275d6fc19b60543371f1055838e7d60942fa4005c3ab1623293e10fb7fR24 */
  side?: string;
  /** @deprecated The align field have been deprecated. See https://github.com/ClickHouse/click-ui/pull/756/files#diff-801534275d6fc19b60543371f1055838e7d60942fa4005c3ab1623293e10fb7fR24 */
  align?: string;
};

type ContextMenuContentProps = RightMenu.ContextMenuContentProps & {
  sub?: true;
  container?: HTMLElement | null;
} & ArrowProps &
  DeprecatedFields;

type ContextMenuSubContentProps = RightMenu.ContextMenuSubContentProps & {
  sub?: never;
  container?: HTMLElement | null;
} & ArrowProps &
  DeprecatedFields;

const rightMenuContentVariants = cva(styles['right-menu-content'], {
  variants: {
    $showArrow: {
      true: styles['right-menu-content_show-arrow'],
      false: '',
    },
  },
  defaultVariants: {
    $showArrow: false,
  },
});

type RightMenuContentComponent = <T extends ElementType = 'div'>(
  props: ComponentProps<typeof GenericMenuPanel<T>> & { $showArrow?: boolean }
) => ReactNode;

const _RightMenuContent = <T extends ElementType = 'div'>(
  {
    $showArrow,
    className,
    ...props
  }: ComponentProps<typeof GenericMenuPanel<T>> & { $showArrow?: boolean },
  ref: ComponentPropsWithRef<T>['ref']
) => (
  <GenericMenuPanel
    ref={ref}
    $showArrow={$showArrow}
    {...(props as ComponentProps<typeof GenericMenuPanel>)}
    className={cn(rightMenuContentVariants({ $showArrow }), className)}
  />
);

const RightMenuContent: RightMenuContentComponent = forwardRef(_RightMenuContent);

const ContextMenuContent = ({
  sub,
  children,
  container,
  showArrow,
  // TODO: remove deprecated side and align
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  side,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  align,
  ...props
}: ContextMenuContentProps | ContextMenuSubContentProps) => {
  const ContentElement = sub ? RightMenu.SubContent : RightMenu.Content;
  const inputModalityProps = useInputModality();
  const portalContainer = useResolvedPortalContainer(container);

  return (
    <RightMenu.Portal container={portalContainer}>
      <RightMenuContent
        {...props}
        $type="context-menu"
        $showArrow={showArrow}
        as={ContentElement}
        {...inputModalityProps}
      >
        {showArrow && (
          <Arrow
            asChild
            as={RightMenu.Arrow}
            width={20}
            height={10}
          >
            <Popover_Arrow className="popover-arrow" />
          </Arrow>
        )}
        {children}
      </RightMenuContent>
    </RightMenu.Portal>
  );
};

ContextMenuContent.displayName = 'ContextMenuContent';
ContextMenu.Content = ContextMenuContent;

const RightMenuGroup = styled(RightMenu.Group)`
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.default.stroke.default};
`;

const ContextMenuGroup = (props: RightMenu.ContextMenuGroupProps) => {
  return <RightMenuGroup {...props} />;
};

ContextMenuGroup.displayName = 'ContextMenuGroup';
ContextMenu.Group = ContextMenuGroup;

const RightMenuSub = styled(RightMenu.Sub)`
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.default.stroke.default};
`;

const ContextMenuSub = ({ ...props }: RightMenu.ContextMenuGroupProps) => {
  return <RightMenuSub {...props} />;
};

ContextMenuSub.displayName = 'ContextMenuSub';
ContextMenu.Sub = ContextMenuSub;

const ContextMenuItem = ({
  icon,
  iconDir,
  type = 'default',
  children,
  ...props
}: ContextMenuItemProps) => {
  return (
    <GenericMenuItem
      as={RightMenu.Item}
      $type={type}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {children}
      </IconWrapper>
    </GenericMenuItem>
  );
};

ContextMenuItem.displayName = 'ContextMenuItem';
ContextMenu.Item = ContextMenuItem;

export default ContextMenu;
