"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { IconSize } from "@/components/Icon/types";
import { Icon, IconName, Spacer, Text } from "@/components";
import { ReactNode } from "react";
import { capitalize } from "../../utils/capitalize";
import styles from "./Accordion.module.scss";

type Size = "sm" | "md" | "lg";
type Gap = "sm" | "md" | "lg";
type Color = "default" | "link";

export interface AccordionProps
  extends SizeProp,
    Omit<RadixAccordion.AccordionSingleProps, "type" | "collapsible" | "title"> {
  title: ReactNode;
  color?: Color;
  icon?: IconName;
  iconSize?: IconSize;
  gap?: Gap;
  children: React.ReactNode;
  fillWidth?: boolean;
}

interface SizeProp {
  size?: Size;
}

const Accordion = ({
  title,
  size = "md",
  color = "default",
  icon,
  iconSize,
  gap,
  children,
  fillWidth = false,
  className,
  ...delegated
}: AccordionProps) => {
  const sizeClass = `cuiSize${capitalize(size)}`;
  const colorClass = `cuiColor${capitalize(color)}`;

  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      className={clsx(
        styles.cuiAccordion,
        {
          [styles.cuiFillWidth]: fillWidth,
        },
        className
      )}
      data-cui-size={size}
      data-cui-color={color}
      {...delegated}
    >
      <RadixAccordion.Item value="item">
        <RadixAccordion.Trigger
          className={clsx(
            styles.cuiTrigger,
            styles[sizeClass],
            styles[colorClass],
            {
              [styles.cuiFillWidth]: fillWidth,
            }
          )}
        >
        <div className={styles.cuiIconsWrapper}>
          <div className={styles.cuiIconWrapper}>
            <Icon
              name="chevron-right"
              size={iconSize || size}
              aria-label="accordion icon"
            />
          </div>
          {icon ? (
            <Icon
              name={icon}
              size={iconSize || size}
            />
          ) : null}
        </div>
        <Text
          component="div"
          size={size}
          fillWidth={fillWidth}
        >
          {title}
        </Text>
      </RadixAccordion.Trigger>
      <RadixAccordion.Content className={styles.cuiContent}>
        <Spacer size={gap} />
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  </RadixAccordion.Root>
  );
};

const SidebarAccordion = (props: AccordionProps) => (
  <div className={styles.cuiSidebarAccordion}>
    <Accordion {...props} />
  </div>
);

export { Accordion, SidebarAccordion };
