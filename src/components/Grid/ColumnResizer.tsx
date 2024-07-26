import {
  MouseEventHandler,
  PointerEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { ColumnResizeFn, SetResizeCursorPositionFn } from "./types";
import throttle from "lodash/throttle";

const ResizeSpan = styled.div<{ $height: number; $isPressed: boolean }>`
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
  ${({ $isPressed }) =>
    $isPressed &&
    `
      height: 100%;
      position: fixed;
    `}
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
  const [isPressed, setIsPressed] = useState<boolean>(false);
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
            header.clientWidth + (e.clientX - pointerRef.current.initialClientX);

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
      $isPressed={isPressed}
      onPointerDown={onPointerDown}
      onPointerUp={e => {
        e.preventDefault();
        e.stopPropagation();

        if (
          resizeRef.current &&
          // 0 is a valid pointerId in Firefox
          (pointerRef.current?.pointerId || pointerRef.current?.pointerId === 0)
        ) {
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
      onMouseUp={onMouseUp}
      data-resize
    />
  );
};

export default ColumnResizer;
