import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const TOLERANCE_PX = 1;

interface Measurement {
  measured: boolean;
  overflows: boolean;
  atEnd: boolean;
}

interface UseAlertOverflowOptions {
  enabled: boolean;
  expanded: boolean;
}

/**
 * Tells whether the text of a height-capped alert overflows, so the toggle and fade can follow.
 * Observers are set up once while `enabled`; `expanded` only triggers one re-measure.
 */
export const useAlertOverflow = ({ enabled, expanded }: UseAlertOverflowOptions) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [measurement, setMeasurement] = useState<Measurement>({
    measured: false,
    overflows: false,
    atEnd: false,
  });

  const measure = useCallback(() => {
    const text = textRef.current;
    if (!text) {
      return;
    }
    const toggle = toggleRef.current;
    // The text is measured against the space it would have without the toggle and its gap,
    // otherwise showing the toggle would shrink the text and keep the toggle stuck at the boundary.
    const reserved = toggle
      ? toggle.getBoundingClientRect().bottom - text.getBoundingClientRect().bottom
      : 0;
    const next: Measurement = {
      measured: true,
      overflows: text.scrollHeight > text.clientHeight + reserved + TOLERANCE_PX,
      atEnd: text.scrollTop + text.clientHeight >= text.scrollHeight - TOLERANCE_PX,
    };
    setMeasurement(previous =>
      previous.measured === next.measured &&
      previous.overflows === next.overflows &&
      previous.atEnd === next.atEnd
        ? previous
        : next
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!enabled || !root || !text) {
      return undefined;
    }

    let frame: number | null = null;
    const schedule = () => {
      if (frame !== null) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = null;
        measure();
      });
    };

    const mutationObserver = new MutationObserver(schedule);
    mutationObserver.observe(text, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    text.addEventListener('scroll', schedule, { passive: true });

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(root);
      resizeObserver.observe(text);
    }

    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      text.removeEventListener('scroll', schedule);
    };
  }, [enabled, measure]);

  useIsomorphicLayoutEffect(() => {
    if (enabled) {
      measure();
    }
  }, [enabled, expanded, measure]);

  const isOverflowing = enabled && measurement.measured && measurement.overflows;
  // Until measured the fade stays on (CSS default), so the first paint of long text is already clipped.
  const isFadeVisible =
    !measurement.measured || (measurement.overflows && !(expanded && measurement.atEnd));

  return { rootRef, textRef, toggleRef, isOverflowing, isFadeVisible };
};
