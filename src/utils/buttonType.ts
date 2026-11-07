import type { ButtonHTMLAttributes, ReactElement } from 'react';

const takesHtmlType = new WeakSet<object>();

/** Marks a component that reads `type` as its variant and takes its native button type from `htmlType`. */
export const markTakesHtmlType = (component: object) => {
  takesHtmlType.add(component);
};

/**
 * Props that give an element of `elementType` the native button type `type`, through `htmlType` for a marked component.
 * Without `type`, a native button or a marked component gets `"button"`, so it does not submit a form.
 */
export const nativeButtonTypeProps = (
  elementType: ReactElement['type'],
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
) =>
  typeof elementType !== 'string' && takesHtmlType.has(elementType)
    ? { type: undefined, htmlType: type ?? 'button' }
    : { type: type ?? (elementType === 'button' ? 'button' : undefined) };
