import { Skeleton, SkeletonProps } from '@/components/Skeleton';
import { renderCUI } from '@/utils/test-utils';

describe('Skeleton', () => {
  it('is always hidden from assistive technology', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        aria-hidden={false}
      />
    );

    expect(getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('draws one text line by default', () => {
    const { getByTestId } = renderCUI(<Skeleton data-testid="skeleton" />);

    expect(getByTestId('skeleton').children).toHaveLength(1);
  });

  it('draws the requested number of text lines', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        lines={3}
      />
    );

    expect(getByTestId('skeleton').children).toHaveLength(3);
  });

  it('draws a rectangle as a single element', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        shape="rectangle"
      />
    );

    expect(getByTestId('skeleton').children).toHaveLength(0);
  });

  it('passes CSS lengths through as custom properties', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        shape="rectangle"
        width="120px"
        height="60%"
      />
    );

    const skeleton = getByTestId('skeleton');
    expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('120px');
    expect(skeleton.style.getPropertyValue('--skeleton-height')).toBe('60%');
  });

  it('resolves space keys to space tokens', () => {
    const { getByTestId } = renderCUI(
      <Skeleton
        data-testid="skeleton"
        shape="rectangle"
        width="xl"
        height="md"
      />
    );

    const skeleton = getByTestId('skeleton');
    expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('var(--spaces-6)');
    expect(skeleton.style.getPropertyValue('--skeleton-height')).toBe('var(--spaces-4)');
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

  it('pins its sweep to the document timeline origin', () => {
    const animation = { startTime: 1234 };
    const getAnimations = vi.fn(() => [animation]);
    Object.defineProperty(HTMLElement.prototype, 'getAnimations', {
      configurable: true,
      value: getAnimations,
    });

    try {
      renderCUI(<Skeleton />);
      expect(getAnimations).toHaveBeenCalledWith({ subtree: true });
      expect(animation.startTime).toBe(0);
    } finally {
      delete (HTMLElement.prototype as Partial<HTMLElement>).getAnimations;
    }
  });

  it('forwards the ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    renderCUI(<Skeleton ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('accepts only the props of its shape', () => {
    const invalidProps: SkeletonProps[] = [
      // @ts-expect-error `height` is for rectangles only
      { height: '2rem' },
      // @ts-expect-error `lines` is for text only
      { shape: 'rectangle', lines: 2 },
      // @ts-expect-error `size` is for text only
      { shape: 'rectangle', size: 'sm' },
      // @ts-expect-error a skeleton has no children
      { children: 'Loading' },
    ];

    expect(invalidProps).toHaveLength(4);
  });
});
