import { MouseEventHandler, PointerEventHandler, useCallback, useRef } from "react";
import styled from "styled-components";
import { ColumnResizeFn, SetResizeCursorPositionFn } from "./types";
import throttle from "lodash/throttle";

const ResizeSpan = styled.div<{ $height: number }>`
  top: 0;
  left: calc(100% - 4px);
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
  &:active {
    height: 100%;
    position: fixed;
  }
`;
type PointerRefType = {
  width: number;
  pointerId: number;
  initialClientX: number;
};

interface Props {
  height: number;
  onColumnResize: ColumnResizeFn;
  columnIndex: number;
  setResizeCursorPosition: SetResizeCursorPositionFn;
}
const ColumnResizer = ({
  height,
  onColumnResize: onColumnResizeProp,
  columnIndex,
  setResizeCursorPosition,
}: Props) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerRefType | null>(null);
  const onColumnResize = throttle(onColumnResizeProp, 1000);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (e.detail > 1) {
        onColumnResize(columnIndex, 0, "auto");
      }
    },
    [columnIndex, onColumnResize]
  );
  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      if (resizeRef.current) {
        resizeRef.current.setPointerCapture(e.pointerId);
        const header = resizeRef.current.closest(`[data-header="${columnIndex}"]`);
        if (header) {
          pointerRef.current = {
            pointerId: e.pointerId,
            initialClientX: e.clientX,
            width: header.clientWidth,
          };

          setResizeCursorPosition(
            resizeRef.current,
            e.clientX,
            header.clientWidth,
            columnIndex
          );
        }
      }
    },
    [columnIndex, setResizeCursorPosition]
  );

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.stopPropagation();
      if (resizeRef.current && pointerRef.current) {
        const header = resizeRef.current.closest(`[data-header="${columnIndex}"]`);
        if (header) {
          resizeRef.current.setPointerCapture(pointerRef.current.pointerId);
          const width =
            header.scrollWidth + (e.clientX - pointerRef.current.initialClientX);
          setResizeCursorPosition(resizeRef.current, e.clientX, width, columnIndex);
          pointerRef.current.width = Math.max(width, 50);
        }
      }
    },
    [columnIndex, setResizeCursorPosition]
  );

  return (
    <ResizeSpan
      ref={resizeRef}
      $height={height}
      onPointerDown={onPointerDown}
      onPointerUp={e => {
        e.preventDefault();
        e.stopPropagation();
        if (resizeRef.current && pointerRef.current?.pointerId) {
          resizeRef.current.releasePointerCapture(pointerRef.current.pointerId);
          const shouldCallResize = e.clientX !== pointerRef.current.initialClientX;
          if (shouldCallResize) {
            onColumnResize(columnIndex, pointerRef.current.width, "manual");
          }
          resizeRef.current.style.top = "0";
          resizeRef.current.style.left = "calc(100% - 4px)";
          pointerRef.current = null;
        }
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onClick={e => e.stopPropagation()}
      onMouseUp={e => e.stopPropagation()}
      data-resize
    />
  );
};

export default ColumnResizer;
