export const mergeRefs =
  <T = any>(
    refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
  ): React.RefCallback<T> =>
  value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
