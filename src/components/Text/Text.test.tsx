import { Text } from './Text';
import { renderCUI } from '@/utils/test-utils';

describe('Text', () => {
  test('given a text, should render it', () => {
    const text = 'text to render';
    const rendered = renderCUI(<Text color="default">{text}</Text>);

    expect(rendered.getByText(text).textContent).toEqual(text);
  });

  test('it should pass properties to the Text component ', () => {
    const text = 'text to render';
    const rendered = renderCUI(<Text data-testid={'test-testid'}>{text}</Text>);

    expect(rendered.getAllByTestId('test-testid').length).toEqual(1);
  });

  test('given noWrap, should apply nowrap styling', () => {
    const text = 'text to render';
    const rendered = renderCUI(<Text noWrap>{text}</Text>);

    expect(rendered.getByText(text).className).toMatch(/text_no-wrap/);
  });

  test('given noWrap false, should apply normal white-space styling', () => {
    const text = 'text to render';
    const rendered = renderCUI(<Text noWrap={false}>{text}</Text>);

    expect(rendered.getByText(text).className).toMatch(/text_wrap/);
  });
});
