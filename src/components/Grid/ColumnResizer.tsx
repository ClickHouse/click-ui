import { MouseEventHandler, PointerEventHandler, useCallback, useRef } from "react";
import styled from "styled-components";

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

const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
  e.preventDefault();
  e.stopPropagation();
};

interface Props {
  height: number;
  onColumnResize: (columnIndex: number, width: number) => void;
  columnIndex: number;
  getFixedResizerLeftPosition: (
    clientX: number,
    width: number,
    columnIndex: number
  ) => number | string;
}
const ColumnResizer = ({
  height,
  onColumnResize,
  columnIndex,
  getFixedResizerLeftPosition,
}: Props) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerRefType | null>(null);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (resizeRef.current) {
        e.stopPropagation();
        const header = resizeRef.current.closest(`[data-header="${columnIndex}"]`);
        if (header) {
          pointerRef.current = {
            pointerId: e.pointerId,
            initialClientX: e.clientX,
            width: header.clientWidth,
          };
          resizeRef.current.setPointerCapture(e.pointerId);
          resizeRef.current.style.left = `${getFixedResizerLeftPosition(
            e.clientX,
            header.clientWidth,
            columnIndex
          )}px`;
        }
      }
    },
    [columnIndex, getFixedResizerLeftPosition]
  );

  const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (resizeRef.current && pointerRef.current) {
        e.stopPropagation();

        const header = resizeRef.current.closest(`[data-header="${columnIndex}"]`);
        if (header) {
          resizeRef.current.setPointerCapture(pointerRef.current.pointerId);
          const width =
            header.scrollWidth + (e.clientX - pointerRef.current.initialClientX);
          const leftPosition = getFixedResizerLeftPosition(e.clientX, width, columnIndex);
          resizeRef.current.style.left = `${leftPosition}px`;
          pointerRef.current.width = Math.max(width, 50);
        }
      }
    },
    [columnIndex, getFixedResizerLeftPosition]
  );

  return (
    <ResizeSpan
      ref={resizeRef}
      $height={height}
      onPointerDown={onPointerDown}
      onPointerUp={e => {
        if (resizeRef.current && pointerRef.current?.pointerId) {
          e.stopPropagation();

          resizeRef.current.releasePointerCapture(pointerRef.current.pointerId);
          onColumnResize(columnIndex, pointerRef.current.width);
          pointerRef.current = null;
        }
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
    />
  );
};

export default ColumnResizer;
