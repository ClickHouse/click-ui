import type { ReactNode } from 'react';
import { renderCUI } from '@/utils/test-utils';
import { Pagination } from '@/components/Pagination';

const containerMock = vi.fn();

vi.mock('@/components/Container', () => ({
  Container: (props: Record<string, unknown> & { children?: ReactNode }) => {
    containerMock(props);
    return <div>{props.children}</div>;
  },
}));

describe('Pagination responsive behavior', () => {
  beforeEach(() => {
    containerMock.mockClear();
  });

  it('renders the outer layout container as non-responsive', () => {
    renderCUI(
      <Pagination
        currentPage={1}
        onChange={vi.fn()}
        rowCount={123}
      />
    );

    expect(
      containerMock.mock.calls.some(([props]) => {
        const typedProps = props as {
          isResponsive?: boolean;
          justifyContent?: string;
        };
        return (
          typedProps.isResponsive === false &&
          typedProps.justifyContent === 'space-between'
        );
      })
    ).toBe(true);
  });

  it('renders all pagination layout containers as non-responsive', () => {
    renderCUI(
      <Pagination
        currentPage={1}
        onChange={vi.fn()}
        totalPages={20}
        rowCount={1000}
        maxRowsPerPageList={[10, 25, 50]}
      />
    );

    const nonResponsiveContainers = containerMock.mock.calls.filter(([props]) => {
      const typedProps = props as {
        isResponsive?: boolean;
      };
      return typedProps.isResponsive === false;
    });

    expect(nonResponsiveContainers.length).toBeGreaterThanOrEqual(3);
  });

  it('renders total page text as a single inline token', () => {
    const { getByText } = renderCUI(
      <Pagination
        currentPage={1}
        onChange={vi.fn()}
        totalPages={2}
      />
    );

    expect(getByText('of 2')).toBeInTheDocument();
  });
});
