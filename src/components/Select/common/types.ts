import { HTMLAttributes, ReactNode } from "react";
import { HorizontalDirection, IconName } from "@/components";
import { PopoverProps } from "@radix-ui/react-popover";

declare type DivProps = HTMLAttributes<HTMLDivElement>;

export interface SelectItemProps
  extends Omit<DivProps, "disabled" | "onSelect" | "value"> {
  separator?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value: string;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

export interface SelectContainerProps
  extends PopoverProps,
    Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir" | "onSelect"> {
  label?: ReactNode;
  children?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  form?: string;
  dir?: "start" | "end";
  orientation?: "horizontal" | "vertical";
  onCreateOption?: (search: string) => void;
  showCheck?: boolean;
  onChange: (selectedValues: Array<string>) => void;
  open: boolean;
  onOpenChange: (open?: boolean) => void;
  value: Array<string>;
  sortable?: boolean;
  onSelect: (value: string) => void;
}

export type SelectItemObject = {
  disabled?: boolean;
  value: string;
  title: string;
  heading?: string;
};
