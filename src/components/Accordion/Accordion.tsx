"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { IconSize } from "@/components/Icon/types";
import { Icon, IconName, Spacer, Text } from "@/components";
import { ReactNode } from "react";
import styles from "./Accordion.module.scss";

type Size = "sm" | "md" | "lg";
type Gap = "sm" | "md" | "lg";
type Color = "default" | "link";

export interface AccordionProps
  extends
    SizeProp,
    Omit<RadixAccordion.AccordionSingleProps, "type" | "collapsible" | "title"> {
  /** The title text or element displayed in the accordion header */
  title: ReactNode;
  /** The color variant of the accordion */
  color?: Color;
  /** Optional icon to display next to the title */
  icon?: IconName;
  /** Size of the optional icon */
  iconSize?: IconSize;
  /** Gap size between the header and content */
  gap?: Gap;
  /** The content to display when the accordion is expanded */
  children: React.ReactNode;
  /** Whether the accordion should fill the full width of its container */
  fillWidth?: boolean;
}

interface SizeProp {
  /** The size variant of the accordion */
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
  ...delegated
}: AccordionProps) => (
  <RadixAccordion.Root
    type="single"
    collapsible
    className={clsx(styles.cuiAccordion, {
      [styles.cuiFillWidth]: fillWidth,
    })}
    {...delegated}
  >
    <RadixAccordion.Item value="item">
      <RadixAccordion.Trigger
        className={clsx(styles.cuiTrigger, {
          [styles.cuiSm]: size === "sm",
          [styles.cuiMd]: size === "md",
          [styles.cuiLg]: size === "lg",
          [styles.cuiDefault]: color === "default",
          [styles.cuiLink]: color === "link",
          [styles.cuiFillWidth]: fillWidth,
        })}
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

const SidebarAccordion = (props: AccordionProps) => (
  <div className={styles.cuiSidebarAccordion}>
    <Accordion {...props} />
  </div>
);

export { Accordion, SidebarAccordion };
