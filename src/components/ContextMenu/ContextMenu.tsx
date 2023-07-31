import * as RightMenu from "@radix-ui/react-context-menu";
import styled from "styled-components";
import { Icon } from "..";
import { Arrow, GenericMenuItem, GenericMenuPanel } from "../GenericMenu";
import PopoverArrow from "../icons/PopoverArrow";

export const ContextMenu = (props: RightMenu.ContextMenuProps) => (
  <RightMenu.Root {...props} />
);

const RightMenuItem = styled(GenericMenuItem)`
  position: relative;
  &:hover .dropdown-arrow,
  &[data-state="open"] .dropdown-arrow {
    left: 0.5rem;
  }
`;

const ContextMenuTrigger = (props: RightMenu.ContextMenuTriggerProps) => {
  return (
    <RightMenu.Trigger
      asChild
      {...props}
    />
  );
};

ContextMenuTrigger.displayName = "ContextMenuTrigger";
ContextMenu.Trigger = ContextMenuTrigger;

const ContextMenuSubTrigger = ({
  children,
  ...props
}: RightMenu.ContextMenuSubTriggerProps) => {
  return (
    <RightMenuItem
      as={RightMenu.SubTrigger}
      {...props}
    >
      {children}
      <div className="dropdown-arrow">
        <Icon name="chevron-right" />
      </div>
    </RightMenuItem>
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

const RightMenuContent = styled(GenericMenuPanel)`
  flex-direction: column;
  z-index: 1;
`;

const ContextMenuContent = ({
  sub,
  children,
  showArrow,
  ...props
}: ContextMenuContentProps | ContextMenuSubContentProps) => {
  const ContentElement = sub ? RightMenu.SubContent : RightMenu.Content;
  return (
    <RightMenu.Portal>
      <RightMenuContent
        type="context-menu"
        as={ContentElement}
        {...props}
      >
        {showArrow && (
          <Arrow
            asChild
            as={RightMenu.Arrow}
            width={20}
            height={10}
          >
            <PopoverArrow />
          </Arrow>
        )}
        {children}
      </RightMenuContent>
    </RightMenu.Portal>
  );
};

ContextMenuContent.displayName = "ContextMenuContent";
ContextMenu.Content = ContextMenuContent;

const RightMenuGroup = styled(RightMenu.Group)`
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

const ContextMenuGroup = (props: RightMenu.ContextMenuGroupProps) => {
  return <RightMenuGroup {...props} />;
};

ContextMenuGroup.displayName = "ContextMenuGroup";
ContextMenu.Group = ContextMenuGroup;

const RightMenuSub = styled(RightMenu.Sub)`
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

const ContextMenuSub = ({ ...props }: RightMenu.ContextMenuGroupProps) => {
  return <RightMenuSub {...props} />;
};

ContextMenuSub.displayName = "ContextMenuSub";
ContextMenu.Sub = ContextMenuSub;

const ContextMenuItem = ({ ...props }: RightMenu.ContextMenuItemProps) => {
  return (
    <RightMenuItem
      as={RightMenu.Item}
      {...props}
    />
  );
};

ContextMenuItem.displayName = "ContextMenuItem";
ContextMenu.Item = ContextMenuItem;

export default ContextMenu;
