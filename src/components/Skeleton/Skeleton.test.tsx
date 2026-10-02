import { Skeleton } from '@/components/Skeleton';
import { renderCUI } from '@/utils/test-utils';

describe('Skeleton', () => {
  it('is hidden from assistive technology', () => {
    const { getByTestId } = renderCUI(<Skeleton data-testid="skeleton" />);

    expect(getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes width and height through as custom properties', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        width="120px"
        height="2rem"
      />
    );

    const skeleton = getByTestId('skeleton');
    expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('120px');
    expect(skeleton.style.getPropertyValue('--skeleton-height')).toBe('2rem');
  });

  it('sets no custom properties by default', () => {
    const { getByTestId } = renderCUI(<Skeleton data-testid="skeleton" />);

    const skeleton = getByTestId('skeleton');
    expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('');
    expect(skeleton.style.getPropertyValue('--skeleton-height')).toBe('');
  });

  it('keeps the consumer style and className', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        className="custom"
        style={{ marginTop: '4px' }}
        width="50%"
      />
    );

    const skeleton = getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom');
    expect(skeleton.style.marginTop).toBe('4px');
    expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('50%');
  });

  it('forwards the ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    renderCUI(<Skeleton ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
