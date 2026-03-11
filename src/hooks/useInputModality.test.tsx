import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { useInputModality } from './useInputModality';

const TestContainer = () => {
  const props = useInputModality();
  return (
    <div
      data-testid="container"
      {...props}
    />
  );
};

describe('useInputModality', () => {
  const setup = () => {
    const { getByTestId } = render(<TestContainer />);
    return getByTestId('container') as HTMLElement;
  };

  it('sets keyboard modality for navigation keys', () => {
    const el = setup();
    for (const key of ['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', 'Tab']) {
      fireEvent.keyDown(el, { key });
      expect(el.dataset.inputModality).toBe('keyboard');
      delete el.dataset.inputModality;
    }
  });

  it('sets keyboard modality for typeahead characters', () => {
    const el = setup();
    for (const key of ['d', 'a', 'z']) {
      fireEvent.keyDown(el, { key });
      expect(el.dataset.inputModality).toBe('keyboard');
      delete el.dataset.inputModality;
    }
  });

  it('sets keyboard modality for Space', () => {
    const el = setup();
    fireEvent.keyDown(el, { key: ' ' });
    expect(el.dataset.inputModality).toBe('keyboard');
  });

  it('does not set keyboard modality for bare modifier keys', () => {
    const el = setup();
    for (const key of ['Meta', 'Control', 'Alt', 'Shift', 'CapsLock']) {
      fireEvent.keyDown(el, { key });
      expect(el.dataset.inputModality).toBeUndefined();
    }
  });

  it('sets pointer modality on pointer move', () => {
    const el = setup();
    fireEvent.keyDown(el, { key: 'ArrowDown' });
    expect(el.dataset.inputModality).toBe('keyboard');

    fireEvent.pointerMove(el);
    expect(el.dataset.inputModality).toBe('pointer');
  });

  it('sets pointer modality on pointer down', () => {
    const el = setup();
    fireEvent.keyDown(el, { key: 'ArrowDown' });
    expect(el.dataset.inputModality).toBe('keyboard');

    fireEvent.pointerDown(el);
    expect(el.dataset.inputModality).toBe('pointer');
  });

  it('seeds modality from global state on focus after keyboard', () => {
    fireEvent.keyDown(document, { key: 'Enter' });

    const el = setup();
    fireEvent.focusIn(el);

    expect(el.dataset.inputModality).toBe('keyboard');
  });

  it('seeds pointer modality from global state on focus after pointer', () => {
    fireEvent.pointerDown(document);

    const el = setup();
    fireEvent.focusIn(el);

    expect(el.dataset.inputModality).toBe('pointer');
  });
});
