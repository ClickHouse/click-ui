import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type MouseEvent, type PointerEvent } from 'react';
import { useBareClick } from './useBareClick';

interface TestButtonProps {
  onBareClick: () => void;
  disabled?: boolean;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TestButton = (props: TestButtonProps) => {
  const handlers = useBareClick<HTMLButtonElement>(props);
  return <button {...handlers}>Press</button>;
};

const nextTask = () => new Promise(resolve => setTimeout(resolve, 0));

describe('useBareClick', () => {
  it('reports a click that no pointerdown came before', () => {
    const onBareClick = vi.fn();
    const { getByRole } = render(<TestButton onBareClick={onBareClick} />);

    getByRole('button', { name: 'Press' }).click();

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('does not report a click after a pointerdown', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );

    await userEvent.click(getByRole('button', { name: 'Press' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('does not report a click after a pointerdown with Ctrl held', async () => {
    const user = userEvent.setup();
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );

    await user.keyboard('{Control>}');
    await user.click(getByRole('button', { name: 'Press' }));
    await user.keyboard('{/Control}');

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('reports a bare click after an earlier pointer click', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );
    const button = getByRole('button', { name: 'Press' });
    await userEvent.click(button);

    button.click();

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('does not report a bare click while disabled', () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
        disabled
      />
    );

    getByRole('button', { name: 'Press' }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('does not report a bare click that onClick prevents', () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn((event: MouseEvent) => event.preventDefault());
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );

    getByRole('button', { name: 'Press' }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('calls the given onPointerDown and onClick', async () => {
    const onPointerDown = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={vi.fn()}
        onPointerDown={onPointerDown}
        onClick={onClick}
      />
    );

    await userEvent.click(getByRole('button', { name: 'Press' }));

    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('reports a bare click after a press that ended off the element', async () => {
    const onBareClick = vi.fn();
    const { getByRole } = render(<TestButton onBareClick={onBareClick} />);
    const button = getByRole('button', { name: 'Press' });
    fireEvent.pointerDown(button);
    fireEvent.pointerUp(document.documentElement);
    await nextTask();

    button.click();

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('reports a bare click after a cancelled press', async () => {
    const onBareClick = vi.fn();
    const { getByRole } = render(<TestButton onBareClick={onBareClick} />);
    const button = getByRole('button', { name: 'Press' });
    fireEvent.pointerDown(button);
    fireEvent.pointerCancel(button);
    await nextTask();

    button.click();

    expect(onBareClick).toHaveBeenCalledTimes(1);
  });

  it('does not report the click of a press that starts while an earlier press is ending', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );
    const button = getByRole('button', { name: 'Press' });
    fireEvent.pointerDown(button);
    fireEvent.pointerUp(document.body);
    fireEvent.pointerDown(button);
    await nextTask();

    fireEvent.pointerUp(button);
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('reports a bare click after a press whose pointerup a handler stopped', async () => {
    const stop = (event: Event) => event.stopPropagation();
    document.body.addEventListener('pointerup', stop);
    try {
      const onBareClick = vi.fn();
      const { getByRole } = render(<TestButton onBareClick={onBareClick} />);
      const button = getByRole('button', { name: 'Press' });
      fireEvent.pointerDown(button);
      fireEvent.pointerUp(document.body);
      await nextTask();

      button.click();

      expect(onBareClick).toHaveBeenCalledTimes(1);
    } finally {
      document.body.removeEventListener('pointerup', stop);
    }
  });

  it('does not let an ended press clear the flag of a later press', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );
    const button = getByRole('button', { name: 'Press' });
    await userEvent.click(button);
    await nextTask();
    fireEvent.pointerDown(button);
    fireEvent.pointerUp(document.body);
    fireEvent.pointerDown(button);
    await nextTask();

    fireEvent.pointerUp(button);
    button.click();

    expect(onClick).toHaveBeenCalled();
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('does not let a released press clear the flag of a later press', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );
    const button = getByRole('button', { name: 'Press' });
    fireEvent.pointerDown(button);
    fireEvent.pointerDown(button);
    fireEvent.pointerUp(document.body);
    fireEvent.pointerDown(button);
    await nextTask();

    fireEvent.pointerUp(button);
    button.click();

    expect(onClick).toHaveBeenCalled();
    expect(onBareClick).not.toHaveBeenCalled();
  });

  it('reports a bare click after a cancelled press whose pointercancel a handler stopped', async () => {
    const stop = (event: Event) => event.stopPropagation();
    document.body.addEventListener('pointercancel', stop);
    try {
      const onBareClick = vi.fn();
      const { getByRole } = render(<TestButton onBareClick={onBareClick} />);
      const button = getByRole('button', { name: 'Press' });
      fireEvent.pointerDown(button);
      fireEvent.pointerCancel(button);
      await nextTask();

      button.click();

      expect(onBareClick).toHaveBeenCalledTimes(1);
    } finally {
      document.body.removeEventListener('pointercancel', stop);
    }
  });

  it('does not let an ended press react when a later press is cancelled', async () => {
    const onBareClick = vi.fn();
    const onClick = vi.fn();
    const { getByRole } = render(
      <TestButton
        onBareClick={onBareClick}
        onClick={onClick}
      />
    );
    const button = getByRole('button', { name: 'Press' });
    fireEvent.pointerDown(button);
    fireEvent.pointerUp(document.body);
    await nextTask();
    fireEvent.pointerDown(button);
    fireEvent.pointerCancel(button);
    fireEvent.pointerDown(button);
    await nextTask();

    fireEvent.pointerUp(button);
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBareClick).not.toHaveBeenCalled();
  });
});
