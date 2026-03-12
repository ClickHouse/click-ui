import { HTMLAttributes, ReactNode } from 'react';
import type { ContainerProps } from '@/components/Container';
import type { DialogProps } from '@/components/Dialog';

export type FlyoutProps = DialogProps;

export interface FlyoutTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** The content of the trigger */
  children: ReactNode;
}

export type FlyoutSizeType = 'default' | 'narrow' | 'wide' | 'widest';
export type FlyoutStrategy = 'relative' | 'absolute' | 'fixed';
export type FlyoutType = 'default' | 'inline';
export type FlyoutAlignmentType = 'start' | 'end';

export interface FlyoutContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  container?: HTMLElement | null;
  showOverlay?: boolean;
  size?: FlyoutSizeType;
  type?: FlyoutType;
  strategy?: FlyoutStrategy;
  closeOnInteractOutside?: boolean;
  width?: string;
  align?: FlyoutAlignmentType;
  onInteractOutside?: (event: CustomEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: CustomEvent) => void;
  onFocusOutside?: (event: CustomEvent) => void;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

interface TitleHeaderProps extends Omit<
  ContainerProps,
  | 'orientation'
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
  | 'orientation'
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
  'orientation' | 'justifyContent' | 'component' | 'padding' | 'gap'
> {
  type?: FlyoutType;
}
