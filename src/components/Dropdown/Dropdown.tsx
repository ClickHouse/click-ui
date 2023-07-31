import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { Icon } from "..";
import { Arrow, GenericMenuItem, GenericMenuPanel } from "../GenericMenu";
import PopoverArrow from "../icons/PopoverArrow";
import { EmptyButton } from "../FormField/commonElement";

export const Dropdown = (props: DropdownMenu.DropdownMenuProps) => (
  <DropdownMenu.Root {...props} />
);

const DropdownMenuItem = styled(GenericMenuItem)`
  position: relative;
  &:hover .dropdown-arrow,
  &[data-state="open"] .dropdown-arrow {
    left: 0.5rem;
  }
`;

interface SubDropdownProps {
  sub?: true;
}

interface MainDropdownProps {
  sub?: never;
}

type DropdownSubTriggerProps = DropdownMenu.DropdownMenuSubTriggerProps &
  SubDropdownProps;

type DropdownTriggerProps = DropdownMenu.DropdownMenuTriggerProps & MainDropdownProps;

const DropdownTrigger = ({
  sub,
  ...props
}: DropdownSubTriggerProps | DropdownTriggerProps) => {
  if (sub) {
    const { children, ...menuProps } = props as DropdownSubTriggerProps;
    return (
      <DropdownMenuItem
        as={DropdownMenu.SubTrigger}
        {...menuProps}
      >
        {children}
        <div className="dropdown-arrow">
          <Icon name="chevron-right" />
        </div>
      </DropdownMenuItem>
    );
  }
  return (
    <EmptyButton
      as={DropdownMenu.Trigger}
      {...(props as DropdownTriggerProps)}
    />
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
        type="dropdown-menu"
        as={ContentElement}
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

const DropdownGroup = ({ ...props }: DropdownMenu.DropdownMenuGroupProps) => {
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

const DropdownItem = ({ ...props }: DropdownMenu.DropdownMenuItemProps) => {
  return (
    <DropdownMenuItem
      as={DropdownMenu.Item}
      {...props}
    />
  );
};

DropdownItem.displayName = "DropdownItem";
Dropdown.Item = DropdownItem;

export default Dropdown;
