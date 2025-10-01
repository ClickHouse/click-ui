import * as RightMenu from "@radix-ui/react-context-menu";
import { HorizontalDirection, Icon, IconName } from "@/components";
import { IconWrapper } from "@/components";
import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./ContextMenu.module.scss";

export const ContextMenu = (props: RightMenu.ContextMenuProps) => (
  <RightMenu.Root {...props} />
);

const ContextMenuTrigger = forwardRef<HTMLDivElement, RightMenu.ContextMenuTriggerProps>(
  ({ disabled, ...props }, ref) => {
    return (
      <RightMenu.Trigger
        asChild
        disabled={disabled}
      >
        <div
          ref={ref}
          {...props}
        />
      </RightMenu.Trigger>
    );
  }
);

ContextMenuTrigger.displayName = "ContextMenuTrigger";
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
    <RightMenu.SubTrigger
      className={styles.cuiGenericMenuItem}
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
    </RightMenu.SubTrigger>
  );
};

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
ContextMenu.SubTrigger = ContextMenuSubTrigger;

export type ArrowProps = {
  showArrow?: boolean;
};

type ContextMenuContentProps = RightMenu.MenuContentProps & {
  sub?: true;
} & ArrowProps;

type ContextMenuSubContentProps = RightMenu.MenuSubContentProps & {
  sub?: never;
} & ArrowProps;

const ContextMenuContent = ({
  sub,
  children,
  showArrow,
  ...props
}: ContextMenuContentProps | ContextMenuSubContentProps) => {
  const ContentElement = sub ? RightMenu.SubContent : RightMenu.Content;
  return (
    <RightMenu.Portal>
      <ContentElement
        className={clsx(
          styles.cuiGenericMenuPanel,
          styles.cuiContextMenu,
          styles.cuiRightMenuContent,
          {
            [styles.cuiShowArrow]: showArrow,
          }
        )}
        {...props}
      >
        {showArrow && (
          <RightMenu.Arrow
            className={styles.cuiArrow}
            width={20}
            height={10}
          />
        )}
        {children}
      </ContentElement>
    </RightMenu.Portal>
  );
};

ContextMenuContent.displayName = "ContextMenuContent";
ContextMenu.Content = ContextMenuContent;

const ContextMenuGroup = (props: RightMenu.ContextMenuGroupProps) => {
  return (
    <RightMenu.Group
      className={styles.cuiRightMenuGroup}
      {...props}
    />
  );
};

ContextMenuGroup.displayName = "ContextMenuGroup";
ContextMenu.Group = ContextMenuGroup;

const ContextMenuSub = ({ ...props }: RightMenu.ContextMenuGroupProps) => {
  return (
    <RightMenu.Sub
      className={styles.cuiRightMenuSub}
      {...props}
    />
  );
};

ContextMenuSub.displayName = "ContextMenuSub";
ContextMenu.Sub = ContextMenuSub;
export interface ContextMenuItemProps extends RightMenu.ContextMenuItemProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

const ContextMenuItem = ({ icon, iconDir, children, ...props }: ContextMenuItemProps) => {
  return (
    <RightMenu.Item
      className={styles.cuiGenericMenuItem}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {children}
      </IconWrapper>
    </RightMenu.Item>
  );
};

ContextMenuItem.displayName = "ContextMenuItem";
ContextMenu.Item = ContextMenuItem;

export default ContextMenu;
