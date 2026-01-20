import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Icon, IconName, Dropdown, HorizontalDirection } from "@/components";
import { BaseButton } from "../commonElement";
import IconWrapper from "../IconWrapper/IconWrapper";

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
  extends DropdownMenuProps, Omit<HTMLAttributes<HTMLButtonElement>, "dir" | "style"> {
  /** The visual style variant of the button */
  type?: ButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should fill the full width of its container */
  fillWidth?: boolean;
  /** The menu items to display in the dropdown */
  menu: Array<Menu>;
  /** Which side of the button to show the dropdown */
  side?: "top" | "bottom";
  /** Optional icon to display in the main button */
  icon?: IconName;
  /** The direction of the icon relative to the label */
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
    if (!targetDiv) {
      return;
    }

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
        $fillWidth={fillWidth}
        ref={ref}
        $type={type}
      >
        <PrimaryButton
          disabled={disabled}
          $type={type}
          $fillWidth={fillWidth}
          {...props}
        >
          <ButtonData
            as={IconWrapper}
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </ButtonData>
        </PrimaryButton>
        <SecondaryButton
          as={Dropdown.Trigger}
          disabled={disabled}
          $type={type}
          asChild
          data-testid="split-button-dropdown"
        >
          <span>
            <Icon
              name="chevron-down"
              size="sm"
            />
          </span>
        </SecondaryButton>
      </SplitButtonTrigger>
      <DropdownContent
        as={Dropdown.Content}
        side={side}
        $width={width}
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
      </DropdownContent>
    </Dropdown>
  );
};

const DropdownContent = styled.div<{ $width: number }>`
  min-width: ${({ $width }) => $width}px;
`;

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

const SplitButtonTrigger = styled.div<{
  $disabled?: boolean;
  $type: ButtonType;
  $fillWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
  ${({ theme, $disabled = false, $type, $fillWidth }) => `
    width: ${$fillWidth ? "100%" : "revert"};
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

const PrimaryButton = styled(BaseButton)<{
  $type: ButtonType;
  $fillWidth?: boolean;
}>`
  border: none;
  align-self: stretch;
  border-radius: 0;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.click.button.split.space.y} ${theme.click.button.split.space.x}`};
  ${({ theme, $type, $fillWidth }) => `
    width: ${$fillWidth ? "100%" : "revert"};
    justify-content: center;
    background: ${theme.click.button.split[$type].background.main.default};
    color: ${theme.click.button.split[$type].text.default};
    font: ${theme.click.button.split.typography.label.default};
    &:hover {
      background: ${theme.click.button.split[$type].background.main.hover};
      color: ${theme.click.button.split[$type].text.hover};
      font: ${theme.click.button.split.typography.label.hover};
    }
    &:focus {
      background: ${theme.click.button.split[$type].background.main.active};
      color: ${theme.click.button.split[$type].text.active};
      font: ${theme.click.button.split.typography.label.active};
    }
    &:disabled {
      background: ${theme.click.button.split[$type].background.main.disabled};
      color: ${theme.click.button.split[$type].text.disabled};
      font: ${theme.click.button.split.typography.label.disabled};
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

const ButtonData = styled.div`
  width: auto;
`;
