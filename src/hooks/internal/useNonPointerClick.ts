import { type MouseEvent, type PointerEvent } from 'react';

let currentPress: { pointerId: number } | null = null;
const listeningDocuments = new WeakSet<Document>();

const endPress = (event: globalThis.PointerEvent) => {
  const press = currentPress;
  // Another pointer ending, such as a second finger, does not end this press.
  if (!press || press.pointerId !== event.pointerId) {
    return;
  }
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

interface UseNonPointerClickOptions<E extends HTMLElement> {
  /** Called for a click that is not part of a pointer press. */
  onNonPointerClick: () => void;
  onPointerDown?: (event: PointerEvent<E>) => void;
  onClick?: (event: MouseEvent<E>) => void;
}

/**
 * Workaround for radix-ui/primitives#1963: Radix triggers that act on pointerdown ignore
 * the click without a pointer press that assistive tech such as VoiceOver sends.
 *
 * Returns `onPointerDown` and `onClick` for the element. They call the given handlers first,
 * then `onNonPointerClick` for a click that is not prevented and not part of a pointer press.
 */
export const useNonPointerClick = <E extends HTMLElement>({
  onNonPointerClick,
  onPointerDown,
  onClick,
}: UseNonPointerClickOptions<E>) => {
  const handlePointerDown = (event: PointerEvent<E>) => {
    if (onPointerDown) {
      onPointerDown(event);
    }
    listenForPressEnd(event.currentTarget.ownerDocument);
    currentPress = { pointerId: event.pointerId };
  };

  const handleClick = (event: MouseEvent<E>) => {
    if (onClick) {
      onClick(event);
    }
    // The click of a press is Radix's to handle, whether Radix acted on the press or not.
    if (currentPress || event.defaultPrevented) {
      return;
    }
    onNonPointerClick();
  };

  return { onPointerDown: handlePointerDown, onClick: handleClick };
};
