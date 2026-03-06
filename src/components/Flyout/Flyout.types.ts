import {
  DialogProps,
  DialogContentProps as RadixDialogContentProps,
} from '@radix-ui/react-dialog';
import type { ContainerProps } from '@/components/Container';

export type FlyoutProps = DialogProps;

export type FlyoutSizeType = 'default' | 'narrow' | 'wide' | 'widest';
export type Strategy = 'relative' | 'absolute' | 'fixed';
export type FlyoutType = 'default' | 'inline';
export type DialogContentAlignmentType = 'start' | 'end';

export interface DialogContentProps extends RadixDialogContentProps {
  /** Container element to portal the flyout into */
  container?: HTMLElement | null;
  /** Whether to show the overlay backdrop */
  showOverlay?: boolean;
  /** The size variant of the flyout */
  size?: FlyoutSizeType;
  /** The type of flyout styling */
  type?: FlyoutType;
  /** CSS position strategy */
  strategy?: Strategy;
  /** Whether clicking outside closes the flyout */
  closeOnInteractOutside?: boolean;
  /** Custom width for the flyout */
  width?: string;
  /** Alignment of the flyout (start = left, end = right) */
  align?: DialogContentAlignmentType;
}

interface TitleHeaderProps extends Omit<
  ContainerProps,
  | 'orientaion'
  | 'justifyContent'
  | 'alignItems'
  | 'component'
  | 'padding'
  | 'gap'
  | 'children'
  | 'fillWidth'
> {
  title: string;
  description?: string;
  type?: FlyoutType;
  children?: never;
  showClose?: boolean;
  showSeparator?: boolean;
}

interface ChildrenHeaderProps extends Omit<
  ContainerProps,
  | 'orientaion'
  | 'justifyContent'
  | 'alignItems'
  | 'component'
  | 'padding'
  | 'gap'
  | 'fillWidth'
> {
  title?: never;
  type?: FlyoutType;
  description?: never;
  showClose?: boolean;
  showSeparator?: boolean;
}

export type FlyoutHeaderProps = TitleHeaderProps | ChildrenHeaderProps;

export interface FlyoutFooterProps extends Omit<
  ContainerProps<'div'>,
  'orientaion' | 'justifyContent' | 'component' | 'padding' | 'gap'
> {
  type?: FlyoutType;
}
