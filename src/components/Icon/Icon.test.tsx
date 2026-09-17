import { Icon } from '@/components/Icon';
import type { ImageName } from '@/components/Icon/Icon.types';
import { within } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';

/**
 * These assert through the rendered public `Icon`, not through
 * `resolveAssetName` directly. The distinction matters: `Icon` used to index
 * its registry with the raw prop, so alias and deprecated names silently
 * rendered nothing while a test of the resolver alone still passed.
 */
describe('Icon', () => {
  // Names outside IconName are the whole point here, so cast at the boundary
  // the same way an untyped (JS) consumer would reach this code path.
  const renderIcon = (name: string) => renderCUI(<Icon name={name as ImageName} />);

  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it('renders a canonical icon name', () => {
    const { getByRole } = renderIcon('share');
    expect(getByRole('img')).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it('renders the deprecated share-arrow name and warns (CUI-115)', () => {
    const { getByRole } = renderIcon('share-arrow');
    expect(getByRole('img')).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('share-arrow'));
  });

  it('resolves share-arrow to the same glyph as share', () => {
    // Scope each query to its own container - both renders share a document.
    const arrow = within(renderIcon('share-arrow').container).getByRole('img');
    const share = within(renderIcon('share').container).getByRole('img');
    expect(arrow.innerHTML).toEqual(share.innerHTML);
  });

  it('renders a deprecated PascalCase name', () => {
    const { getByRole } = renderIcon('ArrowDown');
    expect(getByRole('img')).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ArrowDown'));
  });

  it('renders an alias', () => {
    // 'c#' -> 'csharp', a logo rather than an icon, so this also covers the
    // dispatch to <Logo> happening on the resolved name.
    const { getByRole } = renderIcon('c#');
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('renders nothing for an unknown name', () => {
    const { queryByRole } = renderIcon('definitely-not-an-icon');
    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('labels the icon with the resolved name, not the deprecated one', () => {
    const { getByRole } = renderIcon('share-arrow');
    expect(getByRole('img')).toHaveAttribute('aria-label', 'share');
  });
});
