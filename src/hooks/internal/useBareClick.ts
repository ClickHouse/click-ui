import { type MouseEvent, type PointerEvent, useRef } from 'react';

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

  const handlePointerDown = (event: PointerEvent<E>) => {
    if (onPointerDown) {
      onPointerDown(event);
    }
    pointerDownRef.current = true;
  };

  const handleClick = (event: MouseEvent<E>) => {
    if (onClick) {
      onClick(event);
    }
    // A click after a pointerdown is Radix's to handle, whether it acted on the press or not.
    const afterPointerDown = pointerDownRef.current;
    pointerDownRef.current = false;
    if (afterPointerDown || disabled || event.defaultPrevented) {
      return;
    }
    onBareClick();
  };

  return { onPointerDown: handlePointerDown, onClick: handleClick };
};
