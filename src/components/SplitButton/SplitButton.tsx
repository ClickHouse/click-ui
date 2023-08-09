import { HTMLAttributes } from "react";
import { Icon } from "..";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { GenericMenuItem, GenericMenuPanel } from "../GenericMenu";

export const SplitButton = (props: DropdownMenu.DropdownMenuProps) => {
  return <DropdownMenu.Root {...props} />;
};

type ButtonType = "primary"; //| "secondary";

interface TriggerProps extends HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  disabled?: boolean;
}

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

const PrimaryButton = styled.button<{ $type: ButtonType }>`
  display: flex;
  align-items: center;
  border: none;
  align-self: stretch;
  ${({ theme, $type }) => `
    padding: ${theme.click.button.basic.space.y} ${theme.click.button.basic.space.x};
    gap: ${theme.click.button.basic.space.gap};
    background: ${theme.click.button.split[$type].background.main.default};
    font: ${theme.click.button.basic.typography.label.default};
    color: ${theme.click.button.split[$type].text.default};
    &:hover {
      background: ${theme.click.button.split[$type].background.main.hover};
      font: ${theme.click.button.basic.typography.label.hover};
      color: ${theme.click.button.split[$type].text.hover};
    }
    &:focus {
      background: ${theme.click.button.split[$type].background.main.active};
      font: ${theme.click.button.basic.typography.label.active};
      color: ${theme.click.button.split[$type].text.active};
      outline: none;
    }
    &:disabled {
      background: ${theme.click.button.split[$type].background.main.disabled};
      font: ${theme.click.button.basic.typography.label.disabled};
      color: ${theme.click.button.split[$type].text.disabled};
    }
  `}
`;

const SecondaryButton = styled(DropdownMenu.Trigger)<{ $type: ButtonType }>`
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
const Trigger = ({ type = "primary", disabled = false, ...props }: TriggerProps) => {
  return (
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
  );
};

SplitButton.displayName = "SplitButtonTrigger";
SplitButton.Trigger = Trigger;

const SubTrigger = ({ children, ...props }: DropdownMenu.DropdownMenuSubTriggerProps) => {
  return (
    <DropdownMenuItem
      as={DropdownMenu.SubTrigger}
      {...props}
    >
      {children}
      <div className="dropdown-arrow">
        <Icon name="chevron-right" />
      </div>
    </DropdownMenuItem>
  );
};

SubTrigger.displayName = "SplitButtonSubTrigger";
SplitButton.ContentTrigger = SubTrigger;

const DropdownMenuItem = styled(GenericMenuItem)`
  position: relative;
  &:hover .dropdown-arrow,
  &[data-state="open"] .dropdown-arrow {
    position: relative;
    left: 0.5rem;
  }
`;

const Item = (props: DropdownMenu.DropdownMenuItemProps) => {
  return (
    <DropdownMenuItem
      as={DropdownMenu.Item}
      {...props}
    />
  );
};

SplitButton.displayName = "SplitButtonItem";
SplitButton.Item = Item;

interface DropdownContentProps
  extends Omit<DropdownMenu.MenuContentProps, "align" | "side"> {
  sub?: true;
  side?: "top" | "bottom";
}

interface DropdownSubContentProps extends DropdownMenu.MenuSubContentProps {
  sub?: never;
  side?: never;
}

const DropdownMenuContent = styled(GenericMenuPanel)`
  flex-direction: column;
  z-index: 1;
`;

const Content = ({
  sub,
  children,
  side,
  ...props
}: DropdownContentProps | DropdownSubContentProps) => {
  const ContentElement = sub ? DropdownMenu.SubContent : DropdownMenu.Content;
  return (
    <DropdownMenu.Portal>
      <DropdownMenuContent
        type="dropdown-menu"
        align={sub ? undefined : "end"}
        side={side}
        as={ContentElement}
        {...props}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu.Portal>
  );
};

Content.displayName = "SplitButtonContent";
SplitButton.Content = Content;

const DropdownMenuGroup = styled(DropdownMenu.Group)`
  width: 100%;
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

const SplitButtonGroup = (props: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenuGroup {...props} />;
};

SplitButtonGroup.displayName = "SplitButtonGroup";
SplitButton.Group = SplitButtonGroup;

const DropdownMenuSub = styled(DropdownMenu.Sub)`
  border-bottom: 1px solid
    ${({ theme }) => theme.click.genericMenu.item.color.stroke.default};
`;

const DropdownSub = ({ ...props }: DropdownMenu.DropdownMenuGroupProps) => {
  return <DropdownMenuSub {...props} />;
};

DropdownSub.displayName = "DropdownSub";
SplitButton.Sub = DropdownSub;
