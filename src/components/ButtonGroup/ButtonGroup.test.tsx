import { createRef } from 'react';
import { fireEvent } from '@testing-library/react';
import { ButtonGroup } from '@/components/ButtonGroup';
import type { ButtonGroupProps, SelectionValue } from '@/components/ButtonGroup';
import { renderCUI } from '@/utils/test-utils';

describe('ButtonGroup', () => {
  const renderButtonGroup = (props: ButtonGroupProps) =>
    renderCUI(<ButtonGroup {...props} />);
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders buttons with labels correctly', () => {
    const { getByText } = renderButtonGroup({ options });

    options.forEach(option => {
      expect(getByText(option.label).textContent).toBe(option.label);
    });
  });

  it('renders icon-only buttons when type is iconOnly', () => {
    const iconOptions = [
      { icon: 'table' as const, value: 'table', 'aria-label': 'Table view' },
      { icon: 'pin' as const, value: 'pin', 'aria-label': 'Pin view' },
    ];

    const { getByRole } = renderButtonGroup({
      options: iconOptions,
      type: 'iconOnly',
      'aria-label': 'View options',
    });

    expect(getByRole('button', { name: 'Table view' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Pin view' })).toBeInTheDocument();
  });

  it('falls back to the icon name when iconOnly option has no aria-label', () => {
    const { getByRole } = renderButtonGroup({
      options: [{ icon: 'table', value: 'table' }],
      type: 'iconOnly',
      'aria-label': 'View options',
    });

    expect(getByRole('button', { name: 'table' })).toBeInTheDocument();
  });

  it('forwards ref to the wrapper div', () => {
    const ref = createRef<HTMLDivElement>();
    renderCUI(
      <ButtonGroup
        options={options}
        ref={ref}
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('calls onClick handler when a button is clicked', () => {
    let counter = 0;
    const handleClick = () => (counter = 1);

    const { getByText } = renderButtonGroup({
      options,
      onClick: handleClick,
    });

    fireEvent.click(getByText('Option 2'));

    expect(counter).toEqual(1);
  });

  it('calls onClick with correct arguments in single mode', () => {
    let receivedValue: string | null = null;
    let receivedSelected: SelectionValue | null = null;
    const handleClick = (value: string, selected: SelectionValue) => {
      receivedValue = value;
      receivedSelected = selected;
    };

    const { getByText } = renderButtonGroup({
      options,
      onClick: handleClick,
    });

    fireEvent.click(getByText('Option 2'));

    expect(receivedValue).toBe('option2');
    expect(receivedSelected).toBe('option2');
  });

  it('calls onClick with correct arguments in multi mode', () => {
    let receivedValue: string | null = null;
    let receivedSelected: SelectionValue | null = null;
    const handleClick = (value: string, selected: SelectionValue) => {
      receivedValue = value;
      receivedSelected = selected;
    };

    const { getByText } = renderButtonGroup({
      options,
      onClick: handleClick,
      multiple: true,
      selected: new Set(['option1']),
    });

    fireEvent.click(getByText('Option 2'));

    expect(receivedValue).toBe('option2');
    expect(receivedSelected).toEqual(new Set(['option1', 'option2']));
  });

  it('toggles selection in multi mode', () => {
    let receivedSelected: SelectionValue | null = null;
    const handleClick = (_value: string, selected: SelectionValue) => {
      receivedSelected = selected;
    };

    const { getByText } = renderButtonGroup({
      options,
      onClick: handleClick,
      multiple: true,
      selected: new Set(['option1', 'option2']),
    });

    fireEvent.click(getByText('Option 2'));

    expect(receivedSelected).toEqual(new Set(['option1']));
  });

  it('allows multiple selections in multi mode', () => {
    const { getByText } = renderButtonGroup({
      options,
      multiple: true,
      selected: new Set(['option1', 'option3']),
    });

    const option1 = getByText('Option 1');
    const option2 = getByText('Option 2');
    const option3 = getByText('Option 3');

    expect(option1).toHaveAttribute('aria-pressed', 'true');
    expect(option2).toHaveAttribute('aria-pressed', 'false');
    expect(option3).toHaveAttribute('aria-pressed', 'true');
  });

  it("adds 'aria-pressed' attr to the active/pressed button", () => {
    const { getByText } = renderButtonGroup({
      options,
      selected: 'option2',
    });

    const activeButton = getByText('Option 2');
    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
    const inactiveButton = getByText('Option 1');
    expect(inactiveButton).toHaveAttribute('aria-pressed', 'false');
  });

  describe('Uncontrolled Mode', () => {
    it('uses defaultSelected for initial selection in single mode', () => {
      const { getByText } = renderButtonGroup({
        options,
        defaultSelected: 'option2',
      });

      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'false');
    });

    it('uses defaultSelected for initial selection in multi mode', () => {
      const { getByText } = renderButtonGroup({
        options,
        multiple: true,
        defaultSelected: new Set(['option1', 'option3']),
      });

      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'false');
      expect(getByText('Option 3')).toHaveAttribute('aria-pressed', 'true');
    });

    it('manages internal state in single mode without onClick', () => {
      const { getByText } = renderButtonGroup({
        options,
        defaultSelected: 'option1',
      });

      fireEvent.click(getByText('Option 2'));

      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'false');
      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'true');
    });

    it('manages internal state in multi mode without onClick', () => {
      const { getByText } = renderButtonGroup({
        options,
        multiple: true,
        defaultSelected: new Set(['option1']),
      });

      fireEvent.click(getByText('Option 2'));

      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'true');
    });

    it('toggles selections in multi uncontrolled mode', () => {
      const { getByText } = renderButtonGroup({
        options,
        multiple: true,
        defaultSelected: new Set(['option1', 'option2']),
      });

      fireEvent.click(getByText('Option 2'));

      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'false');
    });

    it('calls onClick with updated state in uncontrolled mode', () => {
      let receivedValue: string | null = null;
      let receivedSelected: SelectionValue | null = null;
      const handleClick = (value: string, selected: SelectionValue) => {
        receivedValue = value;
        receivedSelected = selected;
      };

      const { getByText } = renderButtonGroup({
        options,
        defaultSelected: 'option1',
        onClick: handleClick,
      });

      fireEvent.click(getByText('Option 2'));

      expect(receivedValue).toBe('option2');
      expect(receivedSelected).toBe('option2');
      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Controlled Mode', () => {
    it('respects selected prop over defaultSelected', () => {
      const { getByText } = renderButtonGroup({
        options,
        selected: 'option3',
        defaultSelected: 'option1',
      });

      expect(getByText('Option 3')).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'false');
    });

    it('does not change selection when clicked in controlled mode without parent update', () => {
      const { getByText } = renderButtonGroup({
        options,
        selected: 'option1',
      });

      fireEvent.click(getByText('Option 2'));

      expect(getByText('Option 1')).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('Option 2')).toHaveAttribute('aria-pressed', 'false');
    });
  });
});
