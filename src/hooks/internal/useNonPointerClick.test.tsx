import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type MouseEvent, type PointerEvent } from 'react';
import { useNonPointerClick } from './useNonPointerClick';

interface TestButtonProps {
  onNonPointerClick: () => void;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TestButton = (props: TestButtonProps) => {
  const handlers = useNonPointerClick<HTMLButtonElement>(props);
  return <button {...handlers}>Press</button>;
};

const renderButton = (props: TestButtonProps) => {
  const { getByRole } = render(<TestButton {...props} />);
  return getByRole('button', { name: 'Press' });
};

// VoiceOver in Safari and Firefox: the VO keys, then mousedown, mouseup and click, with no pointer events.
const activateWithVoiceOver = async (element: HTMLElement) => {
  const user = userEvent.setup();
  await user.keyboard('{Control>}{Alt>}');
  fireEvent.mouseDown(element);
  fireEvent.mouseUp(element);
  fireEvent.click(element);
  await user.keyboard('{/Alt}{/Control}');
};

describe('useNonPointerClick', () => {
  it('reports a click without a pointer press', async () => {
    const onNonPointerClick = vi.fn();
    const button = renderButton({ onNonPointerClick });

    await activateWithVoiceOver(button);

    expect(onNonPointerClick).toHaveBeenCalledTimes(1);
  });

  it('does not report the click of a pointer press on the element', async () => {
    const onNonPointerClick = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onNonPointerClick, onClick });

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onNonPointerClick).not.toHaveBeenCalled();
  });

  it('reports a click without a pointer press after a pointer click', async () => {
    const onNonPointerClick = vi.fn();
    const button = renderButton({ onNonPointerClick });
    await userEvent.click(button);

    await activateWithVoiceOver(button);

    expect(onNonPointerClick).toHaveBeenCalledTimes(1);
  });

  it('reports a click without a pointer press after a press that ended off the element', async () => {
    const onNonPointerClick = vi.fn();
    const button = renderButton({ onNonPointerClick });
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: button },
      { target: document.documentElement },
      { keys: '[/MouseLeft]' },
    ]);

    await activateWithVoiceOver(button);

    expect(onNonPointerClick).toHaveBeenCalledTimes(1);
  });

  it('reports a click without a pointer press after a cancelled press', async () => {
    const onNonPointerClick = vi.fn();
    const button = renderButton({ onNonPointerClick });
    fireEvent.pointerDown(button);
    fireEvent.pointerCancel(button);

    await activateWithVoiceOver(button);

    expect(onNonPointerClick).toHaveBeenCalledTimes(1);
  });

  it('reports a click without a pointer press after a press whose pointerup a parent stopped', async () => {
    const onNonPointerClick = vi.fn();
    const { getByRole } = render(
      <div onPointerUp={event => event.stopPropagation()}>
        <TestButton onNonPointerClick={onNonPointerClick} />
      </div>
    );
    const button = getByRole('button', { name: 'Press' });
    await userEvent.click(button);

    await activateWithVoiceOver(button);

    expect(onNonPointerClick).toHaveBeenCalledTimes(1);
  });

  it('does not report a click that onClick prevents', async () => {
    const onNonPointerClick = vi.fn();
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    const button = renderButton({ onNonPointerClick, onClick });

    await activateWithVoiceOver(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onNonPointerClick).not.toHaveBeenCalled();
  });

  it('calls the given onPointerDown and onClick', async () => {
    const onPointerDown = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onNonPointerClick: vi.fn(), onPointerDown, onClick });

    await userEvent.click(button);

    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerDown).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'pointerdown' })
    );
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });
});
