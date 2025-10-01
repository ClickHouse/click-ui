import * as RadixAccordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { IconSize } from "@/components/Icon/types";
import { Container, Icon, IconName, Spacer, Text } from "@/components";
import {
  createContext,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { GapOptions } from "@/components/Container/Container";
import { SizeType as SpacerSizeType } from "@/components/Spacer/Spacer";
import styles from "./MultiAccordion.module.scss";

type Size = "none" | "sm" | "md" | "lg";
type Color = "default" | "link";

type MarkAsCompletedFunctionType = (value: string) => void | Promise<void>;

interface MultiAccordionCommonProps {
  children: React.ReactNode;
  size?: Size;
  fillWidth?: boolean;
  gap?: GapOptions;
  showBorder?: boolean;
  showCheck?: boolean;
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
  ...delegated
}: MultiAccordionProps) => {
  const contextValue = {
    size,
    fillWidth,
    showBorder,
    showCheck,
    markAsCompleted,
  };

  return (
    <RadixAccordion.Root
      className={clsx(styles.cuiAccordionRoot, {
        [styles.cuiFillWidth]: fillWidth,
        [styles.cuiGapNone]: gap === "none",
        [styles.cuiGapXs]: gap === "xs",
        [styles.cuiGapSm]: gap === "sm",
        [styles.cuiGapMd]: gap === "md",
        [styles.cuiGapLg]: gap === "lg",
        [styles.cuiGapXl]: gap === "xl",
      })}
      {...delegated}
    >
      <MultiAccordionContext.Provider value={contextValue}>
        {children}
      </MultiAccordionContext.Provider>
    </RadixAccordion.Root>
  );
};
interface MultiAccordionItemProps
  extends Omit<RadixAccordion.AccordionItemProps, "title"> {
  title: ReactNode;
  color?: Color;
  icon?: IconName;
  iconSize?: IconSize;
  gap?: SpacerSizeType;
  isCompleted?: boolean;
}

const MultiAccordionItem = ({
  value,
  title,
  color,
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
        className={clsx(styles.cuiAccordionTrigger, {
          [styles.cuiSizeNone]: size === "none",
          [styles.cuiSizeSm]: size === "sm",
          [styles.cuiSizeMd]: size === "md",
          [styles.cuiSizeLg]: size === "lg",
          [styles.cuiColorLink]: color === "link",
        })}
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
        <Container
          isResponsive={false}
          gap="sm"
          alignItems="center"
          fillWidth
          justifyContent="space-between"
          component="span"
          overflow="hidden"
        >
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
              className={clsx(styles.cuiCustomIcon, {
                [styles.cuiIsCompleted]: isCompleted,
              })}
              size={iconSize ?? customSize}
              aria-label="accordion icon status"
              onClick={onClickStatus}
              data-icon="accordion-status"
              data-testid="accordion-status-icon"
            />
          )}
        </Container>
      </RadixAccordion.Trigger>
      <RadixAccordion.Content
        className={clsx(styles.cuiAccordionContent, {
          [styles.cuiPaddingNone]: size === "none",
          [styles.cuiPaddingSm]: size === "sm",
          [styles.cuiPaddingMd]: size === "md",
          [styles.cuiPaddingLg]: size === "lg",
        })}
      >
        <Spacer size={gap} />
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

MultiAccordionItem.displayName = "MultiAccordion.Item";
MultiAccordion.Item = MultiAccordionItem;
