import {
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { styled } from "styled-components";
import { ColumnResizeFn, GetResizerPositionFn } from "./types";
import throttle from "lodash/throttle";
import useResizingState, { initialPosition } from "./useResizingState";

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
}
const ColumnResizer = ({
  height,
  onColumnResize: onColumnResizeProp,
  columnIndex,
  getResizerPosition,
  columnWidth,
}: Props) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const { pointer, setPointer, getIsPressed, setIsPressed, position, setPosition } =
    useResizingState();
  const isPressed = getIsPressed(columnIndex);
  const onColumnResize = throttle(onColumnResizeProp, 1000);

  useEffect(() => {
    const control = resizeRef.current;
    if (control && pointer) {
      resizeRef.current.setPointerCapture(pointer?.pointerId);
    }
    return () => {
      if (control && pointer) {
        control.releasePointerCapture(pointer.pointerId);
      }
    };
  }, [pointer]);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setIsPressed(columnIndex, true);
      if (e.detail > 1) {
        // Auto-size the column on double click
        onColumnResize(columnIndex, 0, "auto");
      }
    },
    [columnIndex, onColumnResize, setIsPressed]
  );

  const onMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      setIsPressed(columnIndex, false);
    },
    [columnIndex, setIsPressed]
  );
  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      if (resizeRef.current) {
        setPointer({
          pointerId: e.pointerId,
          initialClientX: e.clientX,
          width: columnWidth,
        });

        const pos = getResizerPosition(e.clientX, columnWidth, columnIndex);
        setPosition(pos);
      }
    },
    [columnIndex, setPointer, columnWidth, getResizerPosition, setPosition]
  );

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      if (resizeRef.current && pointer) {
        const width = columnWidth + (e.clientX - pointer.initialClientX);

        const pos = getResizerPosition(e.clientX, width, columnIndex);
        setPosition(pos);
        pointer.width = Math.max(width, 50);
      }
    },
    [pointer, columnIndex, columnWidth, getResizerPosition, setPosition]
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
        }
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onClick={e => e.stopPropagation()}
      onMouseUp={onMouseUp}
      data-resize
      style={position}
    />
  );
};

export default ColumnResizer;
