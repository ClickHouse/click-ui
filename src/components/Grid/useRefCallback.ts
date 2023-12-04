import { useCallback, useEffect, useRef } from "react";

type CallbackFunction<Args extends unknown[], Result> = (...args: Args) => Result;

export const useRefCallback = <Args extends unknown[], Result>(
  callback?: CallbackFunction<Args, Result>
): CallbackFunction<Args, Result> => {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  }, [callback]);
  return useCallback((...args: Args) => {
    if (ref.current) {
      return ref.current(...args);
    }
    return () => null;
  }, []);
};
