import { HTMLAttributes } from 'react';

export type SkeletonShape = 'text' | 'rectangle';

export type SkeletonSize = 'sm' | 'md';

export type SkeletonSpace = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** A space key (`md`) or any CSS length (`60%`, `6rem`). */
export type SkeletonLength = SkeletonSpace | (string & {});

interface SkeletonBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Defaults to filling the parent. */
  width?: SkeletonLength;
}

export interface SkeletonTextProps extends SkeletonBaseProps {
  /** Defaults to `text`. */
  shape?: 'text';
  /** Height of each line, matched to text of the same size. Defaults to `md`. */
  size?: SkeletonSize;
  /** Number of lines. The last of several lines is 75% wide. Defaults to 1. */
  lines?: number;
  height?: never;
}

export interface SkeletonRectangleProps extends SkeletonBaseProps {
  shape: 'rectangle';
  /** Defaults to filling the parent. */
  height?: SkeletonLength;
  size?: never;
  lines?: never;
}

export type SkeletonProps = SkeletonTextProps | SkeletonRectangleProps;
