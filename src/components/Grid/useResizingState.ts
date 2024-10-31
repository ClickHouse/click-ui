import { useState, useRef, useCallback } from "react";
import { ResizerPosition } from "./types";

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
  position: ResizerPosition;
  setPosition: (position: ResizerPosition) => void;
}

export const initialPosition = {
  left: "calc(100% - 4px)",
  top: "0",
};

const useResizingState = (): ResizingState => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const pointer = useRef<PointerType | null>(null);
  const [position, setPosition] = useState<ResizerPosition>(initialPosition);

  const setPointer = useCallback((newPointer: PointerType | null) => {
    pointer.current = newPointer;
  }, []);

  return {
    pointer: pointer.current,
    setPointer,
    isPressed,
    setIsPressed,
    position,
    setPosition,
  };
};

export default useResizingState;
