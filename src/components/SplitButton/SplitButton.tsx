import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Icon, IconName, Dropdown } from "@/components";
import { BaseButton } from "../commonElement";

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
  disabled,
  menu,
  dir,
  open,
  defaultOpen,
  onOpenChange,
  modal,
  side,
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
      <SplitButtonTrigger
        $disabled={disabled}
        ref={ref}
        $type={type}
      >
        <PrimaryButton
          disabled={disabled}
          $type={type}
          {...props}
        />
        <SecondaryButton
          as={Dropdown.Trigger}
          disabled={disabled}
          $type={type}
          asChild
          data-testid="split-button-dropdown"
        >
          <span>
            <Icon name="chevron-down" />
          </span>
        </SecondaryButton>
      </SplitButtonTrigger>
      <DropdownContent
        as={Dropdown.Content}
        side={side}
        $width={width}
        align="end"
      >
        {menu.map((item: Menu, index: number) => (
          <MenuContentItem
            key={`split-menu-option-${index}`}
            parentKey={`split-menu-option-${index}`}
            {...item}
          />
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
const DropdownContent = styled.div<{ $width: number }>`
  min-width: ${({ $width }) => $width}px;
  background: red;
`;

const IconWrapper = ({ label, icon, iconDir }: Omit<MenuItem, "type" | "items">) => {
  return (
    <>
      {icon && iconDir === "left" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
      {label}
      {icon && iconDir === "right" && (
        <Icon
          name={icon}
          size="sm"
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
  parentKey,
  ...props
}: Menu & { parentKey: string }) => {
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
            label={label}
          />
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

const SplitButtonTrigger = styled.div<{ $disabled?: boolean; $type: ButtonType }>`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
  ${({ theme, $disabled = false, $type }) => `
    border-radius: ${theme.click.button.radii.all};
    border: 1px solid ${theme.click.button.split[$type].stroke.default};
    ${
      $disabled
        ? `
          cursor: not-allowed;
          border-color: ${theme.click.button.split[$type].stroke.disabled};
        `
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

const SecondaryButton = styled(BaseButton)<{ $type: ButtonType }>`
  border: none;
  align-self: stretch;
  border-radius: 0;
  ${({ theme, $type }) => `
    padding: ${theme.click.button.split.icon.space.y} ${theme.click.button.split.icon.space.x};
    background: ${theme.click.button.split[$type].background.action.default};
    color: ${theme.click.button.split[$type].text.default};
    &:hover {
      background: ${theme.click.button.split[$type].background.action.hover};
      color: ${theme.click.button.split[$type].text.hover};
    }
    &:focus {
      background: ${theme.click.button.split[$type].background.action.active};
      color: ${theme.click.button.split[$type].text.active};
    }
    &[data-disabled] {
      background: ${theme.click.button.split[$type].background.action.disabled};
      color: ${theme.click.button.split[$type].text.disabled};
    }
  `}
`;
