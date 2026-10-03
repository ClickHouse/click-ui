import type { CellProps } from './types';
import copyGridElements from './copyGridElements';

describe('copyGridElements', () => {
  const renderedCells: Array<[number, number]> = [];
  const writeText = vi.fn().mockResolvedValue(undefined);

  const Cell: CellProps = ({ type, rowIndex, columnIndex }) => {
    if (type === 'row-cell') {
      renderedCells.push([rowIndex, columnIndex]);
    }
    return <div>{`${rowIndex}:${columnIndex}`}</div>;
  };

  beforeEach(() => {
    renderedCells.length = 0;
    writeText.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('copies selected columns in numeric order', async () => {
    const outerRef = { current: document.createElement('div') };

    await copyGridElements({
      cell: Cell,
      selection: {
        type: 'columns',
        columns: new Set([10, 2, 3]),
        anchorColumn: 10,
      },
      rowCount: 1,
      columnCount: 20,
      focus: { row: 0, column: 0 },
      outerRef,
    });

    expect(renderedCells).toEqual([
      [0, 2],
      [0, 3],
      [0, 10],
    ]);
  });

  it('copies selected rows in numeric order', async () => {
    const outerRef = { current: document.createElement('div') };

    await copyGridElements({
      cell: Cell,
      selection: {
        type: 'rows',
        rows: new Set([10, 2, 3]),
        anchorRow: 10,
      },
      rowCount: 20,
      columnCount: 1,
      focus: { row: 0, column: 0 },
      outerRef,
    });

    expect(renderedCells).toEqual([
      [2, 0],
      [3, 0],
      [10, 0],
    ]);
  });
});
