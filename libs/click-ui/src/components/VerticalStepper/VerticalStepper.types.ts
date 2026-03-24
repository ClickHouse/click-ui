import { HTMLAttributes, ReactNode } from 'react';

export type StepperType = 'numbered' | 'bulleted';
export type StepStatus = 'active' | 'complete' | 'incomplete';

export interface VerticalStepperProps extends HTMLAttributes<HTMLDivElement> {
  type?: StepperType;
}

export interface VerticalStepProps extends HTMLAttributes<HTMLButtonElement> {
  status?: StepStatus;
  collapsed?: boolean;
  label?: ReactNode;
  disabled?: boolean;
}
