import { HTMLAttributes } from 'react';

export type SkeletonShape = 'text' | 'rectangle';

export type SkeletonSize = 'sm' | 'md';

interface SkeletonBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Any CSS width (`60%`, `6rem`, `var(--…)`). Defaults to filling the parent. */
  width?: string;
}

export interface SkeletonTextProps extends SkeletonBaseProps {
  /** Defaults to `text`. */
  shape?: 'text';
  /** Matches `Text` of the same size: each line is as tall as a line of that text. Defaults to `md`. */
  size?: SkeletonSize;
  /** Number of lines. The last of several lines is 75% wide. Defaults to 1. */
  lines?: number;
  height?: never;
}

export interface SkeletonRectangleProps extends SkeletonBaseProps {
  shape: 'rectangle';
  /** Any CSS height (`4rem`, `var(--…)`). Defaults to filling the parent. */
  height?: string;
  size?: never;
  lines?: never;
}

export type SkeletonProps = SkeletonTextProps | SkeletonRectangleProps;
