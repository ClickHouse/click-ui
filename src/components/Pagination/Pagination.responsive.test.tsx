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
});
