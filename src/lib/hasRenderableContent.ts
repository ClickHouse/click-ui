import { Children, ReactNode } from 'react';

/** True when a ReactNode renders something: a number, non-blank text or an element. */
export const hasRenderableContent = (node: ReactNode): boolean =>
  Children.toArray(node).some(child => typeof child !== 'string' || child.trim() !== '');
