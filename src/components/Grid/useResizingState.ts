import { useState, useRef, useCallback } from "react";
import { ResizerPosition } from "./types";

type PointerType = {
  width: number;
  pointerId: number;
  initialClientX: number;
};

export interface ResizingState {
  pointer: PointerType | null;
  setPointer: (pointer: PointerType | null) => void;
  getIsPressed: (columndIndex: number) => boolean;
  setIsPressed: (columndIndex: number, pressed: boolean) => void;
  getPosition: (columndIndex: number) => ResizerPosition;
  setPosition: (position: ResizerPosition) => void;
}

export const initialPosition = {
  left: "calc(100% - 4px)",
  top: "0",
};

const useResizingState = (): ResizingState => {
  const [pressedColumnIndex, setPressedColumndIndex] = useState<number>(-1);
  const pointer = useRef<PointerType | null>(null);
  const [position, setPosition] = useState<ResizerPosition>(initialPosition);

  const setPointer = useCallback((newPointer: PointerType | null) => {
    pointer.current = newPointer;
  }, []);

  const getIsPressed = useCallback(
    (columnIndex: number) => {
      return pressedColumnIndex === columnIndex;
    },
    [pressedColumnIndex]
  );

  const setIsPressed = useCallback((columnIndex: number, pressed: boolean) => {
    if (pressed) {
      setPressedColumndIndex(columnIndex);
    } else {
      setPressedColumndIndex(-1);
    }
  }, []);

  const getPosition = useCallback(
    (columnIndex: number) => {
      if (pressedColumnIndex !== columnIndex) {
        return initialPosition;
      }
      return position;
    },
    [position, pressedColumnIndex]
  );

  return {
    pointer: pointer.current,
    setPointer,
    getIsPressed,
    setIsPressed,
    getPosition,
    setPosition,
  };
};

export default useResizingState;
