import { ComponentPropsWithoutRef, CSSProperties, ElementRef, forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/cva';
import { TabsProps } from './Tabs.types';
import styles from './Tabs.module.css';

const Trigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    {...props}
    className={cn(styles.tabs__trigger, className)}
  />
));

const Content = forwardRef<
  ElementRef<typeof RadixTabs.Content>,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    {...props}
    className={cn(styles.tabs__content, className)}
  />
));

const TriggersList = forwardRef<
  ElementRef<typeof RadixTabs.List>,
  ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    {...props}
    className={cn(styles['tabs__triggers-list'], className)}
  />
));

const Tabs = ({
  defaultValue,
  children,
  ariaLabel,
  onValueChange,
  ...delegated
}: TabsProps) => {
  return (
    <RadixTabs.Root
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...delegated}
    >
      {children}
    </RadixTabs.Root>
  );
};

Tabs.TriggersList = TriggersList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

const FullWidthTabs = ({ className, ...props }: TabsProps) => (
  <Tabs
    {...props}
    className={cn(styles['full-width-tabs'], className)}
  />
);

const FullWidthTabsTrigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger> & { width?: string }
>(({ className, width, style, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    {...props}
    style={
      width
        ? ({ ...style, '--full-width-tabs-trigger-width': width } as CSSProperties)
        : style
    }
    className={cn(
      styles.tabs__trigger,
      styles['full-width-tabs__trigger'],
      width
        ? styles['full-width-tabs__trigger_fixed']
        : styles['full-width-tabs__trigger_grow'],
      className
    )}
  />
));

FullWidthTabs.Trigger = FullWidthTabsTrigger;
FullWidthTabs.TriggersList = TriggersList;
FullWidthTabs.Content = Content;

export { Tabs, FullWidthTabs };
