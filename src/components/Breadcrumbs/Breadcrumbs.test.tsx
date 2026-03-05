import { Breadcrumbs, BreadcrumbItem, BreadcrumbSeparator } from './Breadcrumbs';
import { renderCUI } from '@/utils/test-utils';

describe('Breadcrumbs', () => {
  const renderBreadcrumbs = () =>
    renderCUI(
      <Breadcrumbs>
        <BreadcrumbItem
          icon="home"
          href="#"
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem href="#">Data sources</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem active>Current page</BreadcrumbItem>
      </Breadcrumbs>
    );

  it('should render all breadcrumb items', () => {
    const { getByText } = renderBreadcrumbs();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Data sources')).toBeInTheDocument();
    expect(getByText('Current page')).toBeInTheDocument();
  });

  it('should have a navigation landmark with accessible label', () => {
    const { getByRole } = renderBreadcrumbs();
    const nav = getByRole('navigation');
    expect(nav).toHaveAccessibleName('Breadcrumb');
  });

  it('should mark the active item with aria-current="page"', () => {
    const { getByText } = renderBreadcrumbs();
    const activeItem = getByText('Current page').closest('li');
    expect(activeItem).toHaveAttribute('aria-current', 'page');
  });

  it('should render links for non-active items with href', () => {
    const { getByText } = renderBreadcrumbs();
    const link = getByText('Data sources').closest('a');
    expect(link).toHaveAttribute('href', '#');
  });

  it('should not render a link for the active item', () => {
    const { getByText } = renderBreadcrumbs();
    const activeItem = getByText('Current page');
    expect(activeItem.closest('a')).toBeNull();
  });
});
