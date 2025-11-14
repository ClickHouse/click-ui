"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { IconSize } from "@/components/Icon/types";
import { Icon, IconName, Spacer, Text } from "@/components";
import {
  createContext,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { GapOptions } from "@/components/Container/Container";
import { SizeType as SpacerSizeType } from "@/components/Spacer/Spacer";
import { capitalize } from "../../utils/capitalize";
import styles from "./MultiAccordion.module.scss";

type Size = "none" | "sm" | "md" | "lg";
type Color = "default" | "link";

type MarkAsCompletedFunctionType = (value: string) => void | Promise<void>;

interface MultiAccordionCommonProps {
  /** The accordion items to render */
  children: React.ReactNode;
  /** The size variant of the accordion */
  size?: Size;
  /** Whether the accordion should fill the full width of its container */
  fillWidth?: boolean;
  /** The gap between accordion items */
  gap?: GapOptions;
  /** Whether to show a border around each accordion item */
  showBorder?: boolean;
  /** Whether to show a check/completion indicator on items */
  showCheck?: boolean;
  /** Callback function to mark an item as completed */
  markAsCompleted?: MarkAsCompletedFunctionType;
}

export type MultiAccordionProps = MultiAccordionCommonProps &
  (
    | Omit<RadixAccordion.AccordionMultipleProps, "children">
    | Omit<RadixAccordion.AccordionSingleProps, "children">
  );

interface MultiAccordionContextProps {
  size: Size;
  fillWidth: boolean;
  showBorder: boolean;
  showCheck: boolean;
  markAsCompleted?: MarkAsCompletedFunctionType;
}

const MultiAccordionContext = createContext<MultiAccordionContextProps>({
  size: "md",
  fillWidth: true,
  showBorder: true,
  showCheck: false,
});

export const MultiAccordion = ({
  size = "md",
  children,
  fillWidth = true,
  showCheck = false,
  showBorder = true,
  gap = "md",
  markAsCompleted,
  className,
  ...delegated
}: MultiAccordionProps) => {
  const contextValue = {
    size,
    fillWidth,
    showBorder,
    showCheck,
    markAsCompleted,
  };

  const gapClass = `cuiGap${capitalize(gap)}`;

  return (
    <RadixAccordion.Root
      className={clsx(
        styles.cuiAccordionRoot,
        styles[gapClass],
        {
          [styles.cuiFillWidth]: fillWidth,
        },
        className
      )}
      data-cui-gap={gap}
      {...delegated}
    >
      <MultiAccordionContext.Provider value={contextValue}>
        {children}
      </MultiAccordionContext.Provider>
    </RadixAccordion.Root>
  );
};
interface MultiAccordionItemProps extends Omit<
  RadixAccordion.AccordionItemProps,
  "title"
> {
  /** The title text or element displayed in the accordion item header */
  title: ReactNode;
  /** The color variant of the item */
  color?: Color;
  /** Optional icon to display next to the title */
  icon?: IconName;
  /** Size of the optional icon */
  iconSize?: IconSize;
  /** Gap size between the header and content */
  gap?: SpacerSizeType;
  /** Whether this item is marked as completed */
  isCompleted?: boolean;
}

const MultiAccordionItem = ({
  value,
  title,
  color = "default",
  icon,
  iconSize,
  gap,
  children,
  isCompleted = false,
  ...props
}: MultiAccordionItemProps): ReactElement => {
  const { fillWidth, size, showBorder, showCheck, markAsCompleted } =
    useContext(MultiAccordionContext);

  const onClickStatus: MouseEventHandler<HTMLOrSVGElement> = e => {
    e.preventDefault();
    if (typeof markAsCompleted === "function") {
      markAsCompleted(value);
    }
  };

  const customSize = size === "none" ? "sm" : size;

  const sizeClass = `cuiSize${capitalize(size)}`;
  const colorClass = `cuiColor${capitalize(color)}`;
  const paddingClass = `cuiPadding${capitalize(size)}`;

  return (
    <RadixAccordion.Item
      value={value}
      className={clsx(styles.cuiAccordionItem, {
        [styles.cuiShowBorder]: showBorder,
        [styles.cuiFillWidth]: fillWidth,
      })}
      {...props}
    >
      <RadixAccordion.Trigger
        className={clsx(
          styles.cuiAccordionTrigger,
          styles[sizeClass],
          styles[colorClass]
        )}
        data-cui-size={size}
        data-cui-color={color}
      >
        <div className={styles.cuiAccordionIconsWrapper}>
          <div className={styles.cuiAccordionIconWrapper}>
            <Icon
              name="chevron-right"
              size={iconSize ?? customSize}
              aria-label="accordion icon"
            />
          </div>
          {icon ? (
            <Icon
              name={icon}
              size={iconSize ?? customSize}
            />
          ) : null}
        </div>
        <Text
          component="span"
          size={customSize}
          fillWidth={fillWidth}
          className={styles.cuiAccordionItemTitle}
        >
          {title}
        </Text>
        {showCheck && (
          <Icon
            name={isCompleted ? "check-in-circle" : "circle"}
            className={styles.cuiCustomIcon}
            data-cui-completed={isCompleted ? "true" : undefined}
            size={iconSize ?? customSize}
            aria-label="accordion icon status"
            onClick={onClickStatus}
            data-icon="accordion-status"
            data-testid="accordion-status-icon"
          />
        )}
      </RadixAccordion.Trigger>
      <RadixAccordion.Content
        className={clsx(styles.cuiAccordionContent, styles[paddingClass])}
        data-cui-padding={size}
      >
        <Spacer size={gap} />
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

MultiAccordionItem.displayName = "MultiAccordion.Item";
MultiAccordion.Item = MultiAccordionItem;
