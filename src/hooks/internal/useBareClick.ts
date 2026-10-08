import { type MouseEvent, type PointerEvent } from 'react';

let currentPress: object | null = null;
const listeningDocuments = new WeakSet<Document>();

const endPress = () => {
  const press = currentPress;
  // The click of a press comes in the same task as its pointerup, so the press ends only after it.
  setTimeout(() => {
    if (currentPress === press) {
      currentPress = null;
    }
  }, 0);
};

const listenForPressEnd = (document: Document) => {
  if (listeningDocuments.has(document)) {
    return;
  }
  listeningDocuments.add(document);
  // On the document, because a press can end off the element or under a modal menu that turns off pointer events; captured, because a handler on the way can stop the event.
  document.addEventListener('pointerup', endPress, true);
  document.addEventListener('pointercancel', endPress, true);
};

interface UseBareClickOptions<E extends HTMLElement> {
  /** Called for a click that is not part of a pointer press. */
  onBareClick: () => void;
  onPointerDown?: (event: PointerEvent<E>) => void;
  onClick?: (event: MouseEvent<E>) => void;
}

/**
 * Workaround for radix-ui/primitives#1963: Radix triggers that act on pointerdown ignore
 * the bare click that assistive tech such as VoiceOver sends.
 *
 * Returns `onPointerDown` and `onClick` for the element. They call the given handlers first,
 * then `onBareClick` for a click that is not prevented and not part of a pointer press.
 */
export const useBareClick = <E extends HTMLElement>({
  onBareClick,
  onPointerDown,
  onClick,
}: UseBareClickOptions<E>) => {
  const handlePointerDown = (event: PointerEvent<E>) => {
    if (onPointerDown) {
      onPointerDown(event);
    }
    listenForPressEnd(event.currentTarget.ownerDocument);
    currentPress = {};
  };

  const handleClick = (event: MouseEvent<E>) => {
    if (onClick) {
      onClick(event);
    }
    // The click of a press is Radix's to handle, whether Radix acted on the press or not.
    if (currentPress || event.defaultPrevented) {
      return;
    }
    onBareClick();
  };

  return { onPointerDown: handlePointerDown, onClick: handleClick };
};
