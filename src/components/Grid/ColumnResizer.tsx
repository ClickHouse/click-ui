import {
  PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { styled } from "styled-components";
import { ColumnResizeFn, GetResizerPositionFn } from "./types";
import throttle from "lodash/throttle";
import { initialPosition, ResizingState } from "./useResizingState";

const DOUBLE_CLICK_THRESHOLD_MSEC = 300;

const ResizeSpan = styled.div<{ $height: number; $isPressed: boolean }>`
  top: ${initialPosition.top};
  left: ${initialPosition.left};
  z-index: 1;
  position: absolute;
  height: ${({ $height }) => $height}px;
  cursor: col-resize;
  width: 4px;
  overflow: auto;
  &:hover,
  &:active,
  &:hover {
    background: ${({ theme }) => theme.click.grid.header.cell.color.stroke.selectDirect};
  }
  ${({ $isPressed }) =>
    $isPressed &&
    `
      height: 100%;
      position: fixed;
    `}
`;
interface Props {
  height: number;
  onColumnResize: ColumnResizeFn;
  columnIndex: number;
  getResizerPosition: GetResizerPositionFn;
  columnWidth: number;
  resizingState: ResizingState;
}
const ColumnResizer = ({
  height,
  onColumnResize: onColumnResizeProp,
  columnIndex,
  getResizerPosition,
  columnWidth,
  resizingState,
}: Props) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const {
    pointer,
    setPointer,
    getIsPressed,
    setIsPressed,
    getPosition,
    setPosition,
    lastPressedTimestamp,
  } = resizingState;
  const isPressed = getIsPressed(columnIndex);
  const position = getPosition(columnIndex);
  const onColumnResize = throttle(onColumnResizeProp, 1000);

  useEffect(() => {
    const control = resizeRef.current;
    if (!isPressed || !control || !pointer) {
      return;
    }
    control.setPointerCapture(pointer.pointerId);
    return () => {
      control.releasePointerCapture(pointer.pointerId);
    };
  }, [pointer, isPressed, columnIndex]);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      if (resizeRef.current) {
        // We cannot detect double-click with onDoubleClick event,
        // because this component might be unmounted before the second click and mounted again.
        // We keep track of the last click timestamp and check if it was a double-click.
        if (lastPressedTimestamp > Date.now() - DOUBLE_CLICK_THRESHOLD_MSEC) {
          // Auto-size the column on double click.
          onColumnResize(columnIndex, 0, "auto");
        }
        setPointer({
          pointerId: e.pointerId,
          initialClientX: e.clientX,
          width: columnWidth,
        });
        setIsPressed(columnIndex, true);
        const pos = getResizerPosition(e.clientX, columnWidth, columnIndex);
        setPosition(pos);
      }
    },
    [
      lastPressedTimestamp,
      setPointer,
      columnWidth,
      setIsPressed,
      columnIndex,
      getResizerPosition,
      setPosition,
      onColumnResize,
    ]
  );

  const onPointerMove: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      if (isPressed && pointer) {
        const width = columnWidth + (e.clientX - pointer.initialClientX);
        const pos = getResizerPosition(e.clientX, width, columnIndex);
        setPosition(pos);
        pointer.width = Math.max(width, 50);
      }
    },
    [pointer, isPressed, columnWidth, getResizerPosition, columnIndex, setPosition]
  );

  return (
    <ResizeSpan
      ref={resizeRef}
      $height={height}
      $isPressed={isPressed}
      onPointerDown={onPointerDown}
      onPointerUp={e => {
        e.preventDefault();
        e.stopPropagation();
        if (
          resizeRef.current &&
          // 0 is a valid pointerId in Firefox
          (pointer?.pointerId || pointer?.pointerId === 0)
        ) {
          const shouldCallResize = e.clientX !== pointer.initialClientX;
          if (shouldCallResize) {
            onColumnResize(columnIndex, pointer.width, "manual");
          }
          setPosition(initialPosition);
          setPointer(null);
          setIsPressed(columnIndex, false);
        }
      }}
      onPointerMove={onPointerMove}
      onClick={e => e.stopPropagation()}
      data-resize
      style={position}
    />
  );
};

export default ColumnResizer;
