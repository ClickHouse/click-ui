import type { KeyboardEvent } from 'react';

/** Enter and Space click the element itself, once per press; keys from a focusable descendant are left alone. */
export const clickOnActivationKey = (event: KeyboardEvent<HTMLElement>): void => {
  if (event.defaultPrevented || event.target !== event.currentTarget) {
    return;
  }
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }
  event.preventDefault();
  if (event.repeat) {
    return;
  }
  event.currentTarget.click();
};
