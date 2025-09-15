import { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from "react";
import { HorizontalDirection, IconName } from "@/components";
import { PopoverProps } from "@radix-ui/react-popover";
import { NoAvailableOptionsFactoryProps } from "@/components/Select/common/InternalSelect";

declare type DivProps = HTMLAttributes<HTMLDivElement>;

interface SelectItemComponentProps
  extends Omit<DivProps, "disabled" | "onSelect" | "value" | "children"> {
  separator?: boolean;
  disabled?: boolean;
  onSelect?: (
    value: string,
    type?: SelectionType,
    evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  value: string;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

type SelectItemChildren = {
  children: ReactNode;
  label?: never;
  description?: never;
};

type SelectItemLabel = {
  children?: never;
  label: ReactNode;
  description?: ReactNode;
};

export type SelectItemProps = SelectItemComponentProps &
  (SelectItemChildren | SelectItemLabel);
export interface SelectGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "heading"> {
  heading: ReactNode;
  value?: never;
  onSelect?: never;
}
export interface SelectOptionItem
  extends Omit<SelectItemProps, "children" | "label" | "description"> {
  heading?: never;
  label: ReactNode;
  description?: ReactNode;
  [key: `data-${string}`]: string;
}

interface SelectGroupOptionItem
  extends Omit<SelectGroupProps, "children" | "label" | "description"> {
  options: Array<SelectOptionItem>;
  label?: never;
  [key: `data-${string}`]: string;
}

export type SelectOptionListItem = SelectGroupOptionItem | SelectOptionItem;

type SelectOptionType = {
  options: Array<SelectOptionListItem>;
  children?: never;
};

type SelectChildrenType = {
  children: ReactNode;
  options?: never;
};

export type SelectionType = "custom" | "default";

interface InternalSelectProps
  extends PopoverProps,
    Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir" | "onSelect" | "children"> {
  label?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  name?: string;
  form?: string;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
  allowCreateOption?: boolean;
  onChange: (selectedValues: Array<string>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Array<string>;
  sortable?: boolean;
  onSelect: (
    value: string,
    type?: SelectionType,
    evt?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>
  ) => void;
  multiple?: boolean;
  checkbox?: boolean;
  selectLabel?: string;
  placeholder?: string;
  showSearch?: boolean;
  customText?: string;
  container?: HTMLElement;
  useFullWidthItems?: boolean;
  itemCharacterLimit?: string;
  /**
   * Controls rendering when no options are available.
   * - false: renders nothing
   * - true: renders default message `No Options found{search ? \` for "${search}" \` : ""}`
   * - ({ search: string, onClose: () => void }) => ReactNode: renders the returned node allowing dynamic content based on current search string
   */
  noAvailableOptions?: boolean | ((props: NoAvailableOptionsFactoryProps) => ReactNode);
}

export type SelectOptionProp = SelectOptionType | SelectChildrenType;

export type SelectContainerProps = SelectOptionProp & InternalSelectProps;

export type SelectItemObject = {
  disabled?: boolean;
  value: string;
  title: string;
  heading?: string;
};
