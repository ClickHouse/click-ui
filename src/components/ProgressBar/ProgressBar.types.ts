import { HTMLAttributes, ReactNode } from 'react';

interface CommonProgressBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  progress: number;
  label?: ReactNode;
  error?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  dir?: 'start' | 'end';
}

interface DefaultProgressBar extends CommonProgressBarProps {
  type?: 'default';
  successMessage?: ReactNode;
}

interface SmallProgressBar extends CommonProgressBarProps {
  type: 'small';
  successMessage?: never;
  dismissable?: never;
  onCancel?: never;
}

interface DismissableProgressBar {
  dismissable: true;
  onCancel: () => void;
}

interface NonDismissableProgressBar {
  dismissable?: false;
  onCancel?: never;
}

export type ProgressBarProps =
  | (DefaultProgressBar & (DismissableProgressBar | NonDismissableProgressBar))
  | SmallProgressBar;
