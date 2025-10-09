"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Icon, IconName, Dropdown, HorizontalDirection } from "@/components";
import { BaseButton } from "@/components/commonElement";
import { IconWrapper } from "@/components";
import clsx from "clsx";
import styles from "./SplitButton.module.scss";

type ButtonType = "primary" | "secondary";
type MenuItem = {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  label: ReactNode;
  type?: "item";
  items?: never;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSelect">;

type MenuGroup = {
  icon?: never;
  iconDir?: never;
  label?: never;
  type: "group";
  items: Array<MenuItem | SubMenu>;
};

type SubMenu = Omit<MenuItem, "type" | "items"> & {
  items: Array<MenuGroup | MenuItem>;
  type: "sub-menu";
};

export type Menu = SubMenu | MenuGroup | MenuItem;
export interface SplitButtonProps
  extends DropdownMenuProps,
    Omit<HTMLAttributes<HTMLButtonElement>, "dir"> {
  type?: ButtonType;
  disabled?: boolean;
  fillWidth?: boolean;
  menu: Array<Menu>;
  side?: "top" | "bottom";
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

export const SplitButton = ({
  type = "primary",
  disabled,
  menu,
  dir,
  open,
  defaultOpen,
  onOpenChange,
  modal,
  side,
  fillWidth,
  children,
  icon,
  iconDir = "start",
  ...props
}: SplitButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const targetDiv = ref.current;
    if (!targetDiv) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth);
      }
    });

    resizeObserver.observe(targetDiv);

    return () => {
      resizeObserver.unobserve(targetDiv);
    };
  }, []);

  return (
    <Dropdown
      dir={dir}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <div
        className={clsx(styles.cuiSplitButtonTrigger, {
          [styles.cuiPrimary]: type === "primary",
          [styles.cuiSecondary]: type === "secondary",
          [styles.cuiFillWidth]: fillWidth,
          [styles.cuiDisabled]: disabled,
        })}
        ref={ref}
      >
        <BaseButton
          disabled={disabled}
          className={clsx(styles.cuiPrimaryButton, {
            [styles.cuiPrimary]: type === "primary",
            [styles.cuiSecondary]: type === "secondary",
            [styles.cuiFillWidth]: fillWidth,
          })}
          {...props}
        >
          <div className={styles.cuiButtonData}>
            <IconWrapper
              icon={icon}
              iconDir={iconDir}
            >
              {children}
            </IconWrapper>
          </div>
        </BaseButton>
        <Dropdown.Trigger
          asChild
          data-testid="split-button-dropdown"
        >
          <BaseButton
            disabled={disabled}
            className={clsx(styles.cuiSecondaryButton, {
              [styles.cuiPrimary]: type === "primary",
              [styles.cuiSecondary]: type === "secondary",
            })}
          >
            <Icon
              name="chevron-down"
              size="sm"
            />
          </BaseButton>
        </Dropdown.Trigger>
      </div>
      <Dropdown.Content
        className={styles.cuiDropdownContent}
        style={{ minWidth: `${width}px` }}
        side={side}
        sideOffset={4}
        align="end"
      >
        {menu.map((item: Menu, index: number) => (
          <MenuContentItem
            key={`split-menu-option-${index}`}
            parentKey={`split-menu-option-${index}`}
            {...item}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

const MenuContentItem = ({
  items = [],
  type = "item",
  label,
  icon,
  iconDir = "start",
  parentKey,
  ...props
}: Menu & { parentKey: string }) => {
  if (type === "item") {
    return (
      <Dropdown.Item {...props}>
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {label}
        </IconWrapper>
      </Dropdown.Item>
    );
  }
  if (type === "group") {
    return (
      <Dropdown.Group>
        {items.map((item, index) => (
          <MenuContentItem
            key={`${parentKey}-group-${index}`}
            parentKey={`${parentKey}-group-${index}`}
            {...item}
          />
        ))}
      </Dropdown.Group>
    );
  }
  if (type === "sub-menu") {
    return (
      <Dropdown.Sub>
        <Dropdown.Trigger
          sub
          {...props}
        >
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {label}
          </IconWrapper>
        </Dropdown.Trigger>
        <Dropdown.Content sub>
          {items.map((item, index) => (
            <MenuContentItem
              key={`${parentKey}-sub-menu-${index}`}
              parentKey={`${parentKey}-sub-menu-${index}`}
              {...item}
            />
          ))}
        </Dropdown.Content>
      </Dropdown.Sub>
    );
  }
};
