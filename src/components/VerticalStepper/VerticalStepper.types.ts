import { HTMLAttributes, ReactNode } from 'react';

export type StepperType = 'numbered' | 'bulleted';
export type StepStatus = 'active' | 'complete' | 'incomplete';

export interface VerticalStepperProps extends HTMLAttributes<HTMLDivElement> {
  type?: StepperType;
}

export interface VerticalStepProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: ReactNode;
  status?: StepStatus;
  isOpen?: boolean;
  onClick?: () => void;
}
