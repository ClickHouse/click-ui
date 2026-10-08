import { type MouseEvent, type PointerEvent, useEffect, useRef } from 'react';

interface UseBareClickOptions<E extends HTMLElement> {
  /** Called for a click that no pointerdown on the element came before. */
  onBareClick: () => void;
  disabled?: boolean;
  onPointerDown?: (event: PointerEvent<E>) => void;
  onClick?: (event: MouseEvent<E>) => void;
}

/**
 * Workaround for radix-ui/primitives#1963: Radix triggers that act on pointerdown ignore
 * the bare click that assistive tech such as VoiceOver sends.
 *
 * Returns `onPointerDown` and `onClick` for the element. They call the given handlers first,
 * then `onBareClick` for a click that is not disabled, not prevented, and that no pointerdown
 * came before.
 */
export const useBareClick = <E extends HTMLElement>({
  onBareClick,
  disabled,
  onPointerDown,
  onClick,
}: UseBareClickOptions<E>) => {
  const pointerDownRef = useRef(false);
  const releasePressRef = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      releasePressRef.current?.();
    },
    []
  );

  const handlePointerDown = (event: PointerEvent<E>) => {
    if (onPointerDown) {
      onPointerDown(event);
    }
    releasePressRef.current?.();
    pointerDownRef.current = true;

    // Captured on the root, because a press can end off the element or under a modal menu that turns off pointer events.
    const root = event.currentTarget.ownerDocument.documentElement;
    let clearTimer: ReturnType<typeof setTimeout> | undefined;
    const removeListeners = () => {
      root.removeEventListener('pointerup', handlePressEnd, true);
      root.removeEventListener('pointercancel', handlePressEnd, true);
    };
    const handlePressEnd = () => {
      removeListeners();
      // A click from the same press arrives before the next task, so the flag lasts for that click and no longer.
      clearTimer = setTimeout(() => {
        pointerDownRef.current = false;
      }, 0);
    };
    root.addEventListener('pointerup', handlePressEnd, true);
    root.addEventListener('pointercancel', handlePressEnd, true);
    releasePressRef.current = () => {
      removeListeners();
      clearTimeout(clearTimer);
    };
  };

  const handleClick = (event: MouseEvent<E>) => {
    if (onClick) {
      onClick(event);
    }
    // A click after a pointerdown is Radix's to handle, whether it acted on the press or not.
    if (pointerDownRef.current || disabled || event.defaultPrevented) {
      return;
    }
    onBareClick();
  };

  return { onPointerDown: handlePointerDown, onClick: handleClick };
};
