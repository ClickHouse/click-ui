import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
} from 'react';

const MODIFIER_KEYS = new Set(['Meta', 'Control', 'Alt', 'Shift', 'CapsLock']);

/**
 * WCAG SC 2.4.7 requires a visible keyboard focus indicator, but hover
 * styling is not mandated and adding a focus ring on hover would be
 * visually disruptive. Radix uses a single `data-highlighted` attribute
 * for both hover and keyboard focus, so we track input modality on the
 * container to let CSS distinguish the two.
 *
 * Spread the returned props onto a menu container element.
 */

// Global modality tracks the last input method so that menus opened via
// keyboard can seed their container's data attribute before any per-container
// event fires (the triggering keydown happens on the trigger, not the content).
let lastGlobalModality: 'keyboard' | 'pointer' = 'pointer';

if (typeof document !== 'undefined') {
  document.addEventListener(
    'keydown',
    (e: globalThis.KeyboardEvent) => {
      if (!MODIFIER_KEYS.has(e.key)) {
        lastGlobalModality = 'keyboard';
      }
    },
    true
  );
  document.addEventListener(
    'pointerdown',
    () => {
      lastGlobalModality = 'pointer';
    },
    true
  );
  document.addEventListener(
    'pointermove',
    () => {
      lastGlobalModality = 'pointer';
    },
    true
  );
}

export const useInputModality = () => {
  const onKeyDownCapture = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (!MODIFIER_KEYS.has(e.key)) {
      e.currentTarget.dataset.inputModality = 'keyboard';
    }
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    e.currentTarget.dataset.inputModality = 'pointer';
  }, []);

  const onPointerDown = useCallback((e: PointerEvent<HTMLElement>) => {
    e.currentTarget.dataset.inputModality = 'pointer';
  }, []);

  const onFocusCapture = useCallback((e: FocusEvent<HTMLElement>) => {
    e.currentTarget.dataset.inputModality = lastGlobalModality;
  }, []);

  return { onKeyDownCapture, onPointerMove, onPointerDown, onFocusCapture };
};
