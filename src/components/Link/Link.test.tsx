import { Link, type LinkProps } from '@/components/Link';
import { renderCUI } from '@/utils/test-utils';

describe('Link Component', () => {
  const text = 'text to render';

  const renderLink = (props: LinkProps) => {
    return renderCUI(<Link {...props}>{text}</Link>);
  };

  test('renders the text', () => {
    const rendered = renderLink({});
    expect(rendered.getByText(text).textContent).toEqual(text);
  });

  test('displays icon when isExternal is true', () => {
    const rendered = renderLink({ icon: 'popout' });
    expect(rendered.getAllByTestId('popout').length).toEqual(1);
  });
});
