import { type KeyboardEvent, type PointerEvent, useCallback } from 'react';

const NAV_KEYS = new Set(['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', 'Tab']);

/**
 * WCAG SC 2.4.7 requires a visible keyboard focus indicator, but hover
 * styling is not mandated and adding a focus ring on hover would be
 * visually disruptive. Radix uses a single `data-highlighted` attribute
 * for both hover and keyboard focus, so we track input modality on the
 * container to let CSS distinguish the two.
 *
 * Spread the returned props onto a menu container element.
 */
export function useInputModality() {
  const onKeyDownCapture = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (NAV_KEYS.has(e.key)) {
      e.currentTarget.dataset.inputModality = 'keyboard';
    }
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    e.currentTarget.dataset.inputModality = 'pointer';
  }, []);

  return { onKeyDownCapture, onPointerMove };
}
