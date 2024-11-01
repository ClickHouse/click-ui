import { useState, useCallback } from "react";
import { ResizerPosition } from "./types";

/**
 * Defines the type for pointer information used in resizing.
 * @typedef {Object} PointerType
 * @property {number} width - The width of the pointer component.
 * @property {number} pointerId - Unique identifier for the pointer from a touch event.
 * @property {number} initialClientX - The initial X coordinate of the pointer when resizing started.
 */
export type PointerType = {
  width: number;
  pointerId: number;
  initialClientX: number;
};

/**
 * Defines the state and methods used for managing the column resizing.
 * @typedef {Object} ResizingState
 * @property {PointerType | null} pointer - The current pointer data, or null if no pointer is active.
 * @property {(pointer: PointerType | null) => void} setPointer - Setter to update the pointer.
 * @property {(columnIndex: number) => boolean} getIsPressed - Indicates if a resizer for the given column is currently pressed/dragged.
 * @property {(columnIndex: number, pressed: boolean) => void} setIsPressed - Sets the pressed state for a given column.
 * @property {(columnIndex: number) => ResizerPosition} getPosition - Gets the position of the resizer for the specified column.
 * @property {(position: ResizerPosition) => void} setPosition - Updates the position of the resizer.
 * @property {number} lastPressedTimestamp - Timestamp of the last time a column was pressed, used to detect double-clicks.
 */
export interface ResizingState {
  pointer: PointerType | null;
  setPointer: (pointer: PointerType | null) => void;
  getIsPressed: (columnIndex: number) => boolean;
  setIsPressed: (columnIndex: number, pressed: boolean) => void;
  getPosition: (columnIndex: number) => ResizerPosition;
  setPosition: (position: ResizerPosition) => void;
  lastPressedTimestamp: number;
}

/**
 * The initial position of the resizer element.
 * @type {ResizerPosition}
 */
export const initialPosition = {
  left: "calc(100% - 4px)",
  top: "0",
};

/**
 * Custom hook that provides the state and methods needed to manage a resizing operation on columns.
 * @returns {ResizingState} The resizing state and methods for controlling resizing behavior.
 */
const useResizingState = (): ResizingState => {
  const [pressedColumnIndex, setPressedColumnIndex] = useState<number>(-1);
  const [pointer, setPointer] = useState<PointerType | null>(null);
  const [position, setPosition] = useState<ResizerPosition>(initialPosition);
  const [lastPressedTimestamp, setLastPressedTimestamp] = useState<number>(0);

  /**
   * Checks if the specified column index is currently in a pressed state.
   * @param {number} columnIndex - The index of the column to check.
   * @returns {boolean} True if the column is pressed, false otherwise.
   */
  const getIsPressed = useCallback(
    (columnIndex: number) => {
      return pressedColumnIndex === columnIndex;
    },
    [pressedColumnIndex]
  );

  /**
   * Updates the pressed state for a specified column.
   * @param {number} columnIndex - The index of the column.
   * @param {boolean} pressed - True to set the column as pressed, false to release it.
   */
  const setIsPressed = useCallback((columnIndex: number, pressed: boolean) => {
    if (pressed) {
      setPressedColumnIndex(columnIndex);
      setLastPressedTimestamp(Date.now());
    } else {
      setPressedColumnIndex(-1);
    }
  }, []);

  /**
   * Gets the position of the resizer for the specified column index.
   * @param {number} columnIndex - The index of the column to retrieve the position for.
   * @returns {ResizerPosition} The position of the resizer.
   */
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
    pointer,
    setPointer,
    getIsPressed,
    setIsPressed,
    getPosition,
    setPosition,
    lastPressedTimestamp,
  };
};

export default useResizingState;
