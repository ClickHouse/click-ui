"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import React, { forwardRef } from "react";
import styles from "./Tabs.module.scss";

export interface TabsProps extends RadixTabs.TabsProps {
  /** Accessible label for the tabs component */
  ariaLabel?: string;
}

interface TriggerProps extends RadixTabs.TabsTriggerProps {
  className?: string;
}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixTabs.Trigger
        ref={ref}
        className={clsx(styles.cuiTrigger, className)}
        {...props}
      />
    );
  }
);

Trigger.displayName = "Trigger";

const Content = forwardRef<HTMLDivElement, RadixTabs.TabsContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixTabs.Content
        ref={ref}
        className={clsx(styles.cuiContent, className)}
        {...props}
      />
    );
  }
);

Content.displayName = "Content";

const TriggersList = forwardRef<HTMLDivElement, RadixTabs.TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixTabs.List
        ref={ref}
        className={clsx(styles.cuiTriggersList, className)}
        {...props}
      />
    );
  }
);

TriggersList.displayName = "TriggersList";

const TabsComponent = forwardRef<HTMLDivElement, TabsProps>(
  (
    { defaultValue, children, ariaLabel, onValueChange, className, ...delegated },
    ref
  ) => {
    return (
      <RadixTabs.Root
        ref={ref}
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className={className}
        {...delegated}
      >
        {children}
      </RadixTabs.Root>
    );
  }
);

TabsComponent.displayName = "Tabs";

interface TabsCompoundComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  TriggersList: typeof TriggersList;
  Trigger: typeof Trigger;
  Content: typeof Content;
}

const Tabs = TabsComponent as TabsCompoundComponent;
Tabs.TriggersList = TriggersList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

interface FullWidthTabsProps extends TabsProps {}

interface FullWidthTriggerProps extends RadixTabs.TabsTriggerProps {
  width?: string;
  className?: string;
}

const FullWidthTrigger = forwardRef<HTMLButtonElement, FullWidthTriggerProps>(
  ({ className, width, ...props }, ref) => {
    return (
      <RadixTabs.Trigger
        ref={ref}
        className={clsx(
          styles.cuiFullWidthTrigger,
          {
            [styles.cuiCustomWidth]: width,
          },
          className
        )}
        style={width ? { width } : undefined}
        {...props}
      />
    );
  }
);

FullWidthTrigger.displayName = "FullWidthTrigger";

interface FullWidthTabsCompoundComponent
  extends React.ForwardRefExoticComponent<
    FullWidthTabsProps & React.RefAttributes<HTMLDivElement>
  > {
  TriggersList: typeof TriggersList;
  Trigger: typeof FullWidthTrigger;
  Content: typeof Content;
}

const FullWidthTabsComponent = forwardRef<HTMLDivElement, FullWidthTabsProps>(
  ({ className, ...props }, ref) => {
    return (
      <Tabs
        ref={ref}
        className={clsx(styles.cuiFullWidthTabs, className)}
        {...props}
      />
    );
  }
);

FullWidthTabsComponent.displayName = "FullWidthTabs";

const FullWidthTabs = FullWidthTabsComponent as FullWidthTabsCompoundComponent;
FullWidthTabs.Trigger = FullWidthTrigger;
FullWidthTabs.TriggersList = TriggersList;
FullWidthTabs.Content = Content;

export { Tabs, FullWidthTabs };
