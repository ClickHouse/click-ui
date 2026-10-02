import { HTMLAttributes } from 'react';

export type SkeletonSize = 'sm' | 'md';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Height preset, matched to text of the same size. Defaults to `md`. */
  size?: SkeletonSize;
  /** Any CSS length. Defaults to `100%`. */
  width?: string;
  /** Any CSS length. Overrides the height set by `size`. */
  height?: string;
}
