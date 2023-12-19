import { useCallback, useEffect, useRef } from "react";

type CallbackFunction<Args extends unknown[], Result> = (...args: Args) => Result | null;

export const useRefCallback = <Args extends unknown[], Result>(
  callback: CallbackFunction<Args, Result>
): CallbackFunction<Args, Result> => {
  const ref = useRef(callback);
  useEffect(() => {
    ref.current = callback;
  }, [callback]);
  return useCallback((...args: Args) => {
    return ref.current(...args);
  }, []);
};