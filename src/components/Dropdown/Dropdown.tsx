import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { HorizontalDirection, Icon, IconName } from "@/components";
import { Arrow, GenericMenuItem, GenericMenuPanel } from "../GenericMenu";
import PopoverArrow from "../icons/PopoverArrow";
import IconWrapper from "../IconWrapper/IconWrapper";

export const Dropdown = (props: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root {...props} />
);

const DropdownMenuItem = styled(GenericMenuItem)`
  position: relative;
  display: flex;
`;

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
type DropdownContentProps = DropdownMenu.MenuContentProps & SubDropdownProps & ArrowProps;

type DropdownSubContentProps = DropdownMenu.MenuSubContentProps &
  MainDropdownProps &
  ArrowProps;

const DropdownMenuContent = styled(GenericMenuPanel)`
  min-width: 250px;
  flex-direction: column;
  z-index: 1;
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
        loop
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
    ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

const DropdownGroup = (props: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenuGroup {...props} />;
};

DropdownGroup.displayName = "DropdownGroup";
Dropdown.Group = DropdownGroup;

const DropdownMenuSub = styled(DropdownMenu.Sub)`
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

const DropdownSub = ({ ...props }: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenuSub {...props} />;
};

DropdownSub.displayName = "DropdownSub";
Dropdown.Sub = DropdownSub;

interface DropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  icon?: IconName;
  iconDir?: HorizontalDirection;
}
const DropdownItem = ({ icon, iconDir, children, ...props }: DropdownItemProps) => {
  return (
    <DropdownMenuItem
      as={DropdownMenu.Item}
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
