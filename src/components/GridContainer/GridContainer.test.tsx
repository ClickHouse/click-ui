import { GridContainer } from '@/components/GridContainer/GridContainer';
import type { GridContainerProps } from '@/components/GridContainer/GridContainer';
import { renderCUI } from '@/utils/test-utils';

describe('GridContainer', () => {
  const renderContainer = (props: GridContainerProps) =>
    renderCUI(<GridContainer {...props} />);

  it('should render the container', () => {
    const { getByText } = renderContainer({ children: 'Hello' });
    expect(getByText('Hello').textContent).toBe('Hello');
  });
});
