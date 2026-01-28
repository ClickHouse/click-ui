import { fireEvent } from '@testing-library/react';
import { Flyout } from './Flyout';
import { renderCUI } from '@/utils/test-utils';
import { Button } from '..';
import { DialogProps } from '@radix-ui/react-dialog';

interface Props extends DialogProps {
  showClose?: boolean;
  showSeparator?: boolean;
}

describe('Flyout', () => {
  const renderFlyout = ({ showClose, showSeparator, ...props }: Props) => {
    return renderCUI(
      <Flyout {...props}>
        <Flyout.Trigger>
          <Button iconLeft="user">Flyout Fixed</Button>
        </Flyout.Trigger>
        <Flyout.Content strategy="fixed">
          <Flyout.Header
            title="test1"
            description="test2"
            showClose={showClose}
            showSeparator={showSeparator}
          />
          <Flyout.Body>Flyout Text</Flyout.Body>
          <Flyout.Footer>
            <Flyout.Close label="Cancel" />
            <Button type="primary">Primary Button</Button>
          </Flyout.Footer>
        </Flyout.Content>
      </Flyout>
    );
  };
  it('should open flyout on click', () => {
    const { queryByText, queryByTestId } = renderFlyout({});
    const selectTrigger = queryByText('Flyout Fixed');
    expect(selectTrigger).not.toBeNull();
    expect(queryByText('Flyout Text')).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText('Flyout Text')).not.toBeNull();
    expect(queryByTestId('flyout-header-close-btn')).not.toBeNull();
    expect(queryByTestId('flyout-header-separator')).not.toBeNull();
    expect(queryByText('test1')).not.toBeNull();
  });

  it('should open on updating open param', () => {
    const { queryByText } = renderFlyout({
      open: true,
    });
    expect(queryByText('Flyout Text')).not.toBeNull();
  });

  it('should close flyout on clicking close Button in header', () => {
    const { queryByText, getByTestId } = renderFlyout({});
    const selectTrigger = queryByText('Flyout Fixed');
    expect(selectTrigger).not.toBeNull();
    expect(queryByText('Flyout Text')).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText('Flyout Text')).not.toBeNull();
    expect(queryByText('test1')).not.toBeNull();
    fireEvent.click(getByTestId('flyout-header-close-btn'));
    expect(queryByText('Flyout Text')).toBeNull();
  });

  it('should close flyout on clicking close Button in footer', () => {
    const { queryByText, getByText } = renderFlyout({});
    const selectTrigger = queryByText('Flyout Fixed');
    expect(selectTrigger).not.toBeNull();
    expect(queryByText('Flyout Text')).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText('Flyout Text')).not.toBeNull();
    fireEvent.click(getByText('Cancel'));
    expect(queryByText('Flyout Text')).toBeNull();
  });

  it('should hide close when showClose is false in header', () => {
    const { queryByText, getByText, queryByTestId } = renderFlyout({
      showClose: false,
    });
    const selectTrigger = queryByText('Flyout Fixed');
    expect(selectTrigger).not.toBeNull();
    expect(queryByText('Flyout Text')).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByTestId('flyout-header-close-btn')).toBeNull();

    expect(queryByText('Flyout Text')).not.toBeNull();
    fireEvent.click(getByText('Cancel'));
    expect(queryByText('Flyout Text')).toBeNull();
  });

  it('should hide header separator when showSeparator is false', () => {
    const { queryByText, getByText, queryByTestId } = renderFlyout({
      showSeparator: false,
    });
    const selectTrigger = queryByText('Flyout Fixed');
    expect(selectTrigger).not.toBeNull();
    expect(queryByText('Flyout Text')).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByTestId('flyout-header-separator')).toBeNull();

    expect(queryByText('Flyout Text')).not.toBeNull();
    fireEvent.click(getByText('Cancel'));
    expect(queryByText('Flyout Text')).toBeNull();
  });
});
