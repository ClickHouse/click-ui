import { useState, useRef, useCallback } from "react";

type PointerType = {
  width: number;
  pointerId: number;
  initialClientX: number;
};

interface ResizingState {
  pointer: PointerType | null;
  setPointer: (pointer: PointerType | null) => void;
  isPressed: boolean;
  setIsPressed: (pressed: boolean) => void;
}

const useResizingState = (): ResizingState => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const pointer = useRef<PointerType | null>(null);

  const setPointer = useCallback((newPointer: PointerType | null) => {
    pointer.current = newPointer;
  }, []);

  return {
    pointer: pointer.current,
    setPointer,
    isPressed,
    setIsPressed,
  };
};

export default useResizingState;
