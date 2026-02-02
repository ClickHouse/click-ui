import { IconName } from '..';
import { Link } from './Link';
import { renderCUI } from '@/utils/test-utils';

interface LinkProps {
  icon?: IconName;
}

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
