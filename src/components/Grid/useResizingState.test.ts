import { renderHook, act } from "@testing-library/react";
import useResizingState, { initialPosition, PointerType } from "./useResizingState";

describe("useResizingState hook", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useResizingState());
    expect(result.current.pointer).toBeNull();
    expect(result.current.getIsPressed(0)).toBe(false);
    expect(result.current.getPosition(0)).toEqual(initialPosition);
    expect(result.current.lastPressedTimestamp).toBe(0);
  });

  it("sets pointer correctly", () => {
    const { result } = renderHook(() => useResizingState());
    const pointer: PointerType = { width: 100, pointerId: 1, initialClientX: 150 };

    act(() => {
      result.current.setPointer(pointer);
    });

    expect(result.current.pointer).toEqual(pointer);
  });

  it("sets and retrieves pressed state for a column", () => {
    const { result } = renderHook(() => useResizingState());

    act(() => {
      result.current.setIsPressed(1, true);
    });

    expect(result.current.getIsPressed(1)).toBe(true);
    expect(result.current.getIsPressed(0)).toBe(false);

    act(() => {
      result.current.setIsPressed(1, false);
    });

    expect(result.current.getIsPressed(1)).toBe(false);
  });

  it("updates lastPressedTimestamp when a column is pressed", () => {
    const { result } = renderHook(() => useResizingState());

    const timestampBeforePress = Date.now();
    act(() => {
      result.current.setIsPressed(1, true);
    });

    expect(result.current.lastPressedTimestamp).toBeGreaterThanOrEqual(
      timestampBeforePress
    );
  });

  it("gets and sets position correctly", () => {
    const { result } = renderHook(() => useResizingState());
    const customPosition = { left: "50px", top: "10px" };

    act(() => {
      result.current.setIsPressed(1, true);
      result.current.setPosition(customPosition);
    });

    expect(result.current.getPosition(1)).toEqual(customPosition);

    expect(result.current.getPosition(0)).toEqual(initialPosition);
  });

  it("resets pressed column index when another column is pressed", () => {
    const { result } = renderHook(() => useResizingState());

    act(() => {
      result.current.setIsPressed(1, true);
    });
    expect(result.current.getIsPressed(1)).toBe(true);

    act(() => {
      result.current.setIsPressed(2, true);
    });

    expect(result.current.getIsPressed(1)).toBe(false);
    expect(result.current.getIsPressed(2)).toBe(true);
  });
});
