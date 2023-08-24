import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Icon, IconName, Dropdown } from "@/components";
import { BaseButton } from "../Button/Button";

type ButtonType = "primary"; //| "secondary";
type IconDirection = "left" | "right";
type MenuItem = {
  icon?: IconName;
  iconDir?: IconDirection;
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
  menu: Array<Menu>;
  side?: "top" | "bottom";
}

export const SplitButton = ({
  type = "primary",
  disabled = false,
  menu,
  dir,
  open,
  defaultOpen,
  onOpenChange,
  modal,
  side,
  ...props
}: SplitButtonProps) => {
  return (
    <Dropdown
      dir={dir}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <SplitButtonTrigger
        $disabled={disabled}
        $type={type}
      >
        <PrimaryButton
          disabled={disabled}
          $type={type}
          {...props}
        />
        <SecondaryButton
          disabled={disabled}
          $type={type}
          data-testid="split-button-dropdown"
        >
          <Icon name="chevron-down" />
        </SecondaryButton>
      </SplitButtonTrigger>
      <Dropdown.Content side={side}>
        {menu.map(item => (
          <MenuContentItem {...item} />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

const IconWrapper = ({ label, icon, iconDir }: Omit<MenuItem, "type" | "items">) => {
  return (
    <>
      {icon && iconDir === "left" && (
        <Icon
          name={icon}
          size="lg"
        />
      )}
      {label}
      {icon && iconDir === "right" && (
        <Icon
          name={icon}
          size="lg"
        />
      )}
    </>
  );
};

const MenuContentItem = ({
  items = [],
  type = "item",
  label,
  icon,
  iconDir = "left",
  ...props
}: Menu) => {
  if (type === "item") {
    return (
      <Dropdown.Item {...props}>
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
          label={label}
        />
      </Dropdown.Item>
    );
  }
  if (type === "group") {
    <Dropdown.Group>
      {items.map(item => (
        <MenuContentItem {...item} />
      ))}
    </Dropdown.Group>;
  }
  if (type === "sub-menu") {
    <Dropdown.Sub>
      <Dropdown.Trigger
        sub
        {...props}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
          label={label}
        />
        <div className="dropdown-arrow">
          <Icon name="chevron-right" />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content sub>
        {items.map(item => (
          <MenuContentItem {...item} />
        ))}
      </Dropdown.Content>
    </Dropdown.Sub>;
  }
};

const SplitButtonTrigger = styled.div<{ $disabled: boolean; $type: ButtonType }>`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  ${({ theme, $disabled, $type }) => `
    border-radius: ${theme.click.button.radii.all};
    border: 1px solid ${theme.click.button.split[$type].stroke.default};
    ${
      $disabled
        ? `border-color: ${theme.click.button.split[$type].stroke.disabled};`
        : `
          &:hover {
            border-color: ${theme.click.button.split[$type].stroke.hover};
          }
          &:focus-within {
            border-color: ${theme.click.button.split[$type].stroke.active};
          }
        `
    }
  `}
`;

const PrimaryButton = styled(BaseButton)<{ $type: ButtonType }>`
  border: none;
  align-self: stretch;
  border-radius: 0;
  ${({ theme, $type }) => `
    background: ${theme.click.button.split[$type].background.main.default};
    color: ${theme.click.button.split[$type].text.default};
    &:hover {
      background: ${theme.click.button.split[$type].background.main.hover};
      color: ${theme.click.button.split[$type].text.hover};
    }
    &:focus {
      background: ${theme.click.button.split[$type].background.main.active};
      color: ${theme.click.button.split[$type].text.active};
    }
    &:disabled {
      background: ${theme.click.button.split[$type].background.main.disabled};
      color: ${theme.click.button.split[$type].text.disabled};
    }
  `}
`;

const SecondaryButton = styled(Dropdown.Trigger)<{ $type: ButtonType }>`
  display: flex;
  align-items: center;
  border: none;
  align-self: stretch;
  ${({ theme, $type }) => `
    padding: ${theme.click.button.split.icon.space.y} ${theme.click.button.split.icon.space.x};
    gap: ${theme.click.button.basic.space.gap};
    background: ${theme.click.button.split[$type].background.action.default};
    color: ${theme.click.button.split[$type].text.default};
    &:hover {
      background: ${theme.click.button.split[$type].background.action.hover};
      color: ${theme.click.button.split[$type].text.hover};
    }
    &:focus {
      background: ${theme.click.button.split[$type].background.action.active};
      color: ${theme.click.button.split[$type].text.active};
      outline: none;
    }
    &[data-disabled] {
      background: ${theme.click.button.split[$type].background.action.disabled};
      color: ${theme.click.button.split[$type].text.disabled};
    }
  `}
`;
