import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect', () => {
  it('should not run the effect on the first render', () => {
    const effect = vi.fn();

    renderHook(() => useUpdateEffect(effect));

    // The effect should not have been called yet
    expect(effect).not.toHaveBeenCalled();
  });

  it('should run the effect on subsequent renders', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(() => {
      useUpdateEffect(effect);
    });

    rerender();

    // The effect should have been called once
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should run the effect when dependencies change', () => {
    const effect = vi.fn();

    const { rerender } = renderHook((dependency: string = 'initial_dependency') =>
      useUpdateEffect(effect, [dependency])
    );

    rerender('updated_dependency');

    // The effect should have been called once
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should not run the effect if dependencies do not change', () => {
    const effect = vi.fn();

    const { rerender } = renderHook((dependency: string = 'same_dependency') =>
      useUpdateEffect(effect, [dependency])
    );

    rerender('same_dependency');

    // The effect should not have been called again
    expect(effect).toHaveBeenCalledTimes(0);
  });
});
