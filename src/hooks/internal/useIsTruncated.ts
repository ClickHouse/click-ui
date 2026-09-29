import { RefCallback, useCallback, useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface UseIsTruncatedOptions {
  /** Set `false` to skip measuring; `isTruncated` then stays `false`. Defaults to `true`. */
  enabled?: boolean;
}

export interface UseIsTruncatedResult<E extends HTMLElement = HTMLElement> {
  /** Attach to the element that clips the text. */
  ref: RefCallback<E>;
  /** Whether the element's content is wider than the element. */
  isTruncated: boolean;
}

/** Tracks whether the element's text overflows its width, re-measuring on resize and content changes. */
export const useIsTruncated = <E extends HTMLElement = HTMLElement>({
  enabled = true,
}: UseIsTruncatedOptions = {}): UseIsTruncatedResult<E> => {
  const [element, setElement] = useState<E | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const measure = useCallback(() => {
    setIsTruncated(
      enabled && element !== null && element.scrollWidth > element.clientWidth
    );
  }, [element, enabled]);

  useIsomorphicLayoutEffect(() => {
    measure();

    if (!enabled || !element) {
      return undefined;
    }

    const mutationObserver = new MutationObserver(measure);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => {
        mutationObserver.disconnect();
        window.removeEventListener('resize', measure);
      };
    }

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [element, enabled, measure]);

  return { ref: setElement, isTruncated };
};
