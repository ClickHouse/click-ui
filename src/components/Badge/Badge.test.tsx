import { Badge } from './Badge';
import { renderCUI } from '@/utils/test-utils';

describe('Badge', () => {
  test('given a text, should render ellipsed badge', () => {
    const text = 'text to render';
    const rendered = renderCUI(<Badge text={text} />, 'light');

    expect(rendered.getByText(text).textContent).toEqual(text);
    expect(rendered.queryByTestId('ellipsed-badge-content')).not.toBeNull();
    expect(rendered.queryByTestId('ellipsed-icon-wrapper-text')).not.toBeNull();
    expect(rendered.queryByTestId('normal-badge-content')).toBeNull();
    expect(rendered.queryByTestId('normal-icon-wrapper-text')).toBeNull();
  });
  test('given a text, should render normal badge when ellipsisContent is false', () => {
    const text = 'text to render';
    const rendered = renderCUI(
      <Badge
        text={text}
        ellipsisContent={false}
      />,
      'light'
    );

    expect(rendered.getByText(text).textContent).toEqual(text);
    expect(rendered.queryByTestId('ellipsed-badge-content')).toBeNull();
    expect(rendered.queryByTestId('ellipsed-icon-wrapper-text')).toBeNull();
    expect(rendered.queryByTestId('normal-badge-content')).not.toBeNull();
    expect(rendered.queryByTestId('normal-icon-wrapper-text')).not.toBeNull();
  });
});
