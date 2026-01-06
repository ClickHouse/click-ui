"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import PopoverArrow from "@/components/icons/PopoverArrow";
import { IconWrapper } from "@/components";
import { HorizontalDirection, IconName } from "@/components/types";
import { Icon } from "@/components";
import styles from "./Dropdown.module.scss";

export const Dropdown = (props: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root {...props} />
);

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
      <DropdownMenu.SubTrigger
        className={styles.cuiSubTrigger}
        {...menuProps}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {children}
        </IconWrapper>
        <Icon name="chevron-right" />
      </DropdownMenu.SubTrigger>
    );
  }

  return (
    <DropdownMenu.Trigger
      asChild
      {...(props as DropdownTriggerProps)}
    >
      <div className={styles.cuiTrigger}>{children}</div>
    </DropdownMenu.Trigger>
  );
};

DropdownTrigger.displayName = "DropdownTrigger";
Dropdown.Trigger = DropdownTrigger;

export type ArrowProps = {
  showArrow?: boolean;
};
type DropdownContentProps = DropdownMenu.MenuContentProps & SubDropdownProps & ArrowProps;

type DropdownSubContentProps = DropdownMenu.MenuSubContentProps &
  MainDropdownProps &
  ArrowProps;

const DropdownContent = ({
  sub,
  children,
  showArrow,
  ...props
}: DropdownContentProps | DropdownSubContentProps) => {
  const ContentElement = sub ? DropdownMenu.SubContent : DropdownMenu.Content;
  const contentClasses = clsx(styles.cuiMenuContent, {
    [styles.cuiMenuContentWithArrow]: showArrow,
    [styles.cuiDropdownMenu]: !sub,
  });

  return (
    <DropdownMenu.Portal>
      <ContentElement
        className={contentClasses}
        sideOffset={4}
        loop
        collisionPadding={100}
        {...props}
      >
        {showArrow && (
          <DropdownMenu.Arrow
            asChild
            width={20}
            height={10}
          >
            <PopoverArrow className={styles.cuiArrow} />
          </DropdownMenu.Arrow>
        )}
        {children}
      </ContentElement>
    </DropdownMenu.Portal>
  );
};

DropdownContent.displayName = "DropdownContent";
Dropdown.Content = DropdownContent;

const DropdownGroup = (props: DropdownMenu.DropdownMenuGroupProps) => {
  return (
    <DropdownMenu.Group
      className={styles.cuiMenuGroup}
      {...props}
    />
  );
};

DropdownGroup.displayName = "DropdownGroup";
Dropdown.Group = DropdownGroup;

const DropdownSub = ({ ...props }: DropdownMenu.DropdownMenuGroupProps) => {
  return (
    <DropdownMenu.Sub
      className={styles.cuiMenuSub}
      {...props}
    />
  );
};

DropdownSub.displayName = "DropdownSub";
Dropdown.Sub = DropdownSub;

export interface DropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  /** The type of the menu item */
  type?: "default" | "danger";
}
const DropdownItem = ({
  icon,
  iconDir,
  type = "default",
  children,
  ...props
}: DropdownItemProps) => {
  return (
    <DropdownMenu.Item
      className={clsx(styles.cuiMenuItem, {
        [styles.cuiMenuItemDanger]: type === "danger",
      })}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {children}
      </IconWrapper>
    </DropdownMenu.Item>
  );
};

DropdownItem.displayName = "DropdownItem";
Dropdown.Item = DropdownItem;

export default Dropdown;
