import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type MouseEvent, type PointerEvent } from 'react';
import { useBareClick } from './useBareClick';

interface TestButtonProps {
  onBareClick: () => void;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TestButton = (props: TestButtonProps) => {
  const handlers = useBareClick<HTMLButtonElement>(props);
  return <button {...handlers}>Press</button>;
};

const renderButton = (props: TestButtonProps) => {
  const { getByRole } = render(<TestButton {...props} />);
  return getByRole('button', { name: 'Press' });
};

// Enter on a focused button clicks it without a pointer press, as assistive tech does.
const clickWithoutPointer = async (button: HTMLElement) => {
  button.focus();
  await userEvent.keyboard('{Enter}');
};

describe('useBareClick', () => {
  it('reports a click that comes without a pointer press', async () => {
    const onBareClick = vi.fn();
    const button = renderButton({ onBareClick });

    await clickWithoutPointer(button);

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('does not report the click of a pointer press on the element', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onBareClick, onClick });

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('reports a click without a pointer press after a pointer click', async () => {
    const onBareClick = vi.fn();
    const button = renderButton({ onBareClick });
    await userEvent.click(button);

    await clickWithoutPointer(button);

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('reports a click without a pointer press after a press that ended off the element', async () => {
    const onBareClick = vi.fn();
    const button = renderButton({ onBareClick });
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: button },
      { target: document.documentElement },
      { keys: '[/MouseLeft]' },
    ]);

    await clickWithoutPointer(button);

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('reports a click without a pointer press after a cancelled press', async () => {
    const onBareClick = vi.fn();
    const button = renderButton({ onBareClick });
    fireEvent.pointerDown(button);
    fireEvent.pointerCancel(button);

    await clickWithoutPointer(button);

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('reports a click without a pointer press after a press whose pointerup a parent stopped', async () => {
    const onBareClick = vi.fn();
    const { getByRole } = render(
      <div onPointerUp={event => event.stopPropagation()}>
        <TestButton onBareClick={onBareClick} />
      </div>
    );
    const button = getByRole('button', { name: 'Press' });
    await userEvent.click(button);

    await clickWithoutPointer(button);

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('does not report a click that onClick prevents', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    const button = renderButton({ onBareClick, onClick });

    await clickWithoutPointer(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('calls the given onPointerDown and onClick', async () => {
    const onPointerDown = vi.fn();
    const onClick = vi.fn();
    const button = renderButton({ onBareClick: vi.fn(), onPointerDown, onClick });

    await userEvent.click(button);

    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPointerDown).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'pointerdown' })
    );
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
  });
});
