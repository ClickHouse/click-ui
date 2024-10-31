import { useState, useCallback, useMemo } from "react";
import { ResizerPosition } from "./types";

export type PointerType = {
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
  lastPressedTimestamp: number;
}

export const initialPosition = {
  left: "calc(100% - 4px)",
  top: "0",
};

const useResizingState = (): ResizingState => {
  const [pressedColumnIndex, setPressedColumndIndex] = useState<number>(-1);
  const [pointer, setPointer] = useState<PointerType | null>(null);
  const [position, setPosition] = useState<ResizerPosition>(initialPosition);
  const [lastPressedTimestamp, setLastPressedTimestamp] = useState<number>(0);

  const getIsPressed = useCallback(
    (columnIndex: number) => {
      return pressedColumnIndex === columnIndex;
    },
    [pressedColumnIndex]
  );

  const setIsPressed = useCallback((columnIndex: number, pressed: boolean) => {
    if (pressed) {
      setPressedColumndIndex(columnIndex);
      setLastPressedTimestamp(Date.now());
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

  return useMemo(
    () => ({
      pointer,
      setPointer,
      getIsPressed,
      setIsPressed,
      getPosition,
      setPosition,
      lastPressedTimestamp,
    }),
    [pointer, getIsPressed, setIsPressed, getPosition, lastPressedTimestamp]
  );
};

export default useResizingState;
