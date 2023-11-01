import { HTMLAttributes, ReactNode } from "react";
import { HorizontalDirection, IconName } from "@/components";
import { PopoverProps } from "@radix-ui/react-popover";

declare type DivProps = HTMLAttributes<HTMLDivElement>;

interface SelectItemComponentProps
  extends Omit<DivProps, "disabled" | "onSelect" | "value" | "children"> {
  separator?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value: string;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

type SelectItemChildren = {
  children: ReactNode;
  label?: never;
};

type SelectItemLabel = {
  children?: never;
  label: ReactNode;
};

export type SelectItemProps = SelectItemComponentProps &
  (SelectItemChildren | SelectItemLabel);
export interface SelectGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "heading"> {
  heading: ReactNode;
  value?: never;
  onSelect?: never;
}
export interface SelectOptionItem extends Omit<SelectItemProps, "children" | "label"> {
  heading?: never;
  label: ReactNode;
  [key: `data-${string}`]: string;
}

interface SelectGroupOptionItem extends Omit<SelectGroupProps, "children" | "label"> {
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
  onCreateOption?: (search: string) => void;
  showCheck?: boolean;
  onChange: (selectedValues: Array<string>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Array<string>;
  sortable?: boolean;
  onSelect: (value: string) => void;
  multiple?: boolean;
  showSearch?: boolean;
  customText?: string;
  container?: HTMLElement;
}

export type SelectOptionProp = SelectOptionType | SelectChildrenType;

export type SelectContainerProps = SelectOptionProp & InternalSelectProps;

export type SelectItemObject = {
  disabled?: boolean;
  value: string;
  title: string;
  heading?: string;
};
