import { Container, ContainerProps } from '@/components/Container';
import { renderCUI } from '@/utils/test-utils';

describe('Container', () => {
  const renderContainer = (props: ContainerProps<'div'>) =>
    renderCUI(<Container {...props} />);

  it('should render the container', () => {
    const { getByText } = renderContainer({ children: 'Hello' });
    expect(getByText('Hello').textContent).toBe('Hello');
  });
});
