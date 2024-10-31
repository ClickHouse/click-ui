import { MouseEventHandler, PointerEventHandler, useCallback, useRef } from "react";
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
  const { pointer, setPointer, isPressed, setIsPressed, position, setPosition } =
    useResizingState();
  const onColumnResize = throttle(onColumnResizeProp, 1000);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setIsPressed(true);

      if (e.detail > 1) {
        onColumnResize(columnIndex, 0, "auto");
      }
    },
    [columnIndex, onColumnResize, setIsPressed]
  );

  const onMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();

      setIsPressed(false);
    },
    [setIsPressed]
  );
  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      if (resizeRef.current) {
        resizeRef.current.setPointerCapture(e.pointerId);
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
        const header = resizeRef.current.closest(`[data-header="${columnIndex}"]`);
        if (header) {
          resizeRef.current.setPointerCapture(pointer.pointerId);
          const width = columnWidth + (e.clientX - pointer.initialClientX);

          const pos = getResizerPosition(e.clientX, width, columnIndex);
          setPosition(pos);
          pointer.width = Math.max(width, 50);
        }
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
          resizeRef.current.releasePointerCapture(pointer.pointerId);
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
