import { ReactNode } from "react";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { MenuOptionType } from "./Grid";

interface GridContextMenuGuardProps {
  menuOptions?: Array<MenuOptionType>;
  children: ReactNode;
}

const GridContextMenuGuard = ({
  menuOptions = [],
  children,
}: GridContextMenuGuardProps): ReactNode => {
  if (menuOptions.length === 0) {
    children;
  }
  return (
    <ContextMenu>
      <ContextMenu.Trigger></ContextMenu.Trigger>
      <ContextMenu.Content>
        {menuOptions.map(({ label, ...optionProps }, index) => (
          <ContextMenu.Item
            key={`grid-context-menu-${index}`}
            {...optionProps}
          >
            {label}
          </ContextMenu.Item>
        ))}
      </ContextMenu.Content>
    </ContextMenu>
  );
};

export default GridContextMenuGuard;
