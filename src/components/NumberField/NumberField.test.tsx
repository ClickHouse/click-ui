import { NumberField } from '@/components/NumberField';
import { renderCUI } from '@/utils/test-utils';
import { fireEvent } from '@testing-library/react';

describe('NumberField', () => {
  const onChange = vi.fn();

  afterEach(() => {
    onChange.mockClear();
  });

  it('renders a number input', () => {
    const { getByRole } = renderCUI(
      <NumberField
        label="Amount"
        onChange={onChange}
      />
    );

    expect(getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders endContent when provided', () => {
    const { getByText } = renderCUI(
      <NumberField
        label="Spend limit"
        onChange={onChange}
        endContent={<span>dollars / credits</span>}
      />
    );

    expect(getByText('dollars / credits')).toBeInTheDocument();
  });

  it('renders startContent when provided', () => {
    const { getByText } = renderCUI(
      <NumberField
        label="Price"
        onChange={onChange}
        startContent={<span>$</span>}
      />
    );

    expect(getByText('$')).toBeInTheDocument();
  });

  it('focuses the input when startContent is clicked', () => {
    const { getByText, getByRole } = renderCUI(
      <NumberField
        label="Price"
        onChange={onChange}
        startContent={<span>$</span>}
      />
    );

    fireEvent.click(getByText('$'));

    expect(document.activeElement).toBe(getByRole('spinbutton'));
  });

  it('renders loading spinner', () => {
    const { getByRole } = renderCUI(
      <NumberField
        label="Amount"
        onChange={onChange}
        loading
      />
    );

    expect(getByRole('img', { name: 'loading-animated' })).toBeInTheDocument();
  });

  it('renders endContent and loading spinner together', () => {
    const { getByText, getByRole } = renderCUI(
      <NumberField
        label="Amount"
        onChange={onChange}
        loading
        endContent={<span>units</span>}
      />
    );

    expect(getByText('units')).toBeInTheDocument();
    expect(getByRole('img', { name: 'loading-animated' })).toBeInTheDocument();
  });
});
