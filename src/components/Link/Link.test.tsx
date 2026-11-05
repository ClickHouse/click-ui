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

  test('keeps the icon name out of the link name', () => {
    const { getByRole } = renderCUI(
      <Link
        href="/docs"
        icon="arrow-right"
      >
        Docs
      </Link>
    );
    expect(getByRole('link', { name: 'Docs' })).toBeInTheDocument();
  });

  test('keeps the icon name when the link has no text', () => {
    const { getByRole } = renderCUI(
      <Link
        href="/x"
        icon="popout"
      />
    );
    expect(getByRole('link')).toHaveAccessibleName('popout');
  });
});
