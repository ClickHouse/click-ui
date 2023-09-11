import { HTMLAttributes } from "react";
import { HorizontalDirection, IconName } from "@/components";

declare type DivProps = HTMLAttributes<HTMLDivElement>;

export interface ComboboxItemProps
  extends Omit<DivProps, "disabled" | "onSelect" | "value"> {
  separator?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value: string;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}
