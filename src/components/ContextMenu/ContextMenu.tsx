import * as RightMenu from "@radix-ui/react-context-menu";
import styled from "styled-components";
import { Icon } from "..";
import { Arrow, GenericMenuItem, GenericMenuPanel } from "../GenericMenu";
import PopoverArrow from "../icons/PopoverArrow";

export const ContextMenu = (props: RightMenu.ContextMenuProps) => (
  <RightMenu.Root {...props} />
);

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
    <GenericMenuItem
      as={RightMenu.SubTrigger}
      {...props}
    >
      {children}
      <div className="dropdown-arrow">
        <Icon name="chevron-right" />
      </div>
    </GenericMenuItem>
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

const RightMenuContent = styled(GenericMenuPanel)<{ $showArrow?: boolean }>`
  flex-direction: column;
  z-index: 1;
  ${({ $showArrow }) =>
    $showArrow
      ? `
      &[data-side="bottom"] {
        margin-top: -1px;
      }
      &[data-side="top"] {
        margin-bottom: -1px;
      }
      &[data-side="left"] {
        margin-right: -1px;
        .popover-arrow {
          margin-right: 1rem;
        }
      }
      }
      &[data-side="right"] {
        margin-left: -1px;
        .popover-arrow {
          margin-left: 1rem;
        }
      }
  `
      : ""};
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
        $showArrow={showArrow}
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
            <PopoverArrow className="popover-arrow" />
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
    <GenericMenuItem
      as={RightMenu.Item}
      {...props}
    />
  );
};

ContextMenuItem.displayName = "ContextMenuItem";
ContextMenu.Item = ContextMenuItem;

export default ContextMenu;
