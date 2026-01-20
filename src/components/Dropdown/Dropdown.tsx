import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { styled } from "styled-components";
import { Arrow, GenericMenuItem, GenericMenuPanel } from "../GenericMenu";
import PopoverArrow from "../icons/PopoverArrow";
import IconWrapper from "../IconWrapper/IconWrapper";
import { HorizontalDirection, IconName } from "../types";
import { Icon } from "../Icon/Icon";

import { CSSPropertiesWithVars  } from "../types";

export const Dropdown = (props: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root {...props} />
);

const DropdownMenuItem = styled(GenericMenuItem)<{ $type?: "default" | "danger" }>`
  position: relative;
  display: flex;
  min-height: 32px;
`;

interface SubDropdownProps {
  sub?: true;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

interface MainDropdownProps {
  sub?: never;
}

interface StyledDropdownSubTriggerProps extends DropdownMenu.DropdownMenuSubTriggerProps {
  style?: CSSPropertiesWithVars;
}

interface StyledDropdownTriggerProps extends DropdownMenu.DropdownMenuTriggerProps {
  style?: CSSPropertiesWithVars;
}

type DropdownSubTriggerProps = StyledDropdownSubTriggerProps & SubDropdownProps;
type DropdownTriggerProps = StyledDropdownTriggerProps & MainDropdownProps;

const Trigger = styled(DropdownMenu.Trigger)`
  cursor: pointer;
  width: fit-content;
  &[disabled] {
    cursor: not-allowed;
  }
`;

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

  return (
    <Trigger
      asChild
      {...(props as DropdownTriggerProps)}
    >
      <div>{children}</div>
    </Trigger>
  );
};

DropdownTrigger.displayName = "DropdownTrigger";
Dropdown.Trigger = DropdownTrigger;

export type ArrowProps = {
  showArrow?: boolean;
};

interface StyledDropdownContentProps extends DropdownMenu.DropdownMenuContentProps {
  style?: CSSPropertiesWithVars;
  children?: ReactNode;
}

interface StyledDropdownSubContentProps extends DropdownMenu.DropdownMenuSubContentProps {
  style?: CSSPropertiesWithVars;
  children?: ReactNode;
}

type DropdownContentProps = StyledDropdownContentProps & SubDropdownProps & ArrowProps;
type DropdownSubContentProps = StyledDropdownSubContentProps & MainDropdownProps & ArrowProps;

const DropdownMenuContent = styled(GenericMenuPanel)`
  min-width: ${({ theme }) => theme.click.genericMenu.item.size.minWidth};
  flex-direction: column;
  z-index: 1;
  overflow-y: auto;
`;

const DropdownContent = ({
  sub,
  children,
  showArrow,
  ...props
}: DropdownContentProps | DropdownSubContentProps) => {
  const ContentElement = sub ? DropdownMenu.SubContent : DropdownMenu.Content;
  return (
    <DropdownMenu.Portal>
      <DropdownMenuContent
        $type="dropdown-menu"
        $showArrow={showArrow}
        as={ContentElement}
        sideOffset={4}
        loop
        collisionPadding={100}
        {...props}
      >
        {showArrow && (
          <Arrow
            asChild
            as={DropdownMenu.Arrow}
            width={20}
            height={10}
          >
            <PopoverArrow />
          </Arrow>
        )}
        {children}
      </DropdownMenuContent>
    </DropdownMenu.Portal>
  );
};

DropdownContent.displayName = "DropdownContent";
Dropdown.Content = DropdownContent;

const DropdownMenuGroup = styled(DropdownMenu.Group)`
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.default.stroke.default};
`;

const DropdownGroup = (props: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenuGroup {...props} />;
};

DropdownGroup.displayName = "DropdownGroup";
Dropdown.Group = DropdownGroup;

const DropdownMenuSub = styled(DropdownMenu.Sub)`
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.default.stroke.default};
`;

const DropdownSub = ({ ...props }: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenuSub {...props} />;
};

DropdownSub.displayName = "DropdownSub";
Dropdown.Sub = DropdownSub;

interface DropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  /** Icon to display in the menu item */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The type of the menu item */
  type?: "default" | "danger";
  style?: CSSPropertiesWithVars;
}

export type { DropdownItemProps };

const DropdownItem = ({
  icon,
  iconDir,
  type = "default",
  children,
  ...props
}: DropdownItemProps) => {
  return (
    <DropdownMenuItem
      as={DropdownMenu.Item}
      $type={type}
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

DropdownItem.displayName = "DropdownItem";
Dropdown.Item = DropdownItem;

export default Dropdown;
