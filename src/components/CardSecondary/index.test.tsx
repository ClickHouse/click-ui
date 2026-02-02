import { screen } from '@testing-library/react';
import { CardSecondary, CardSecondaryProps } from './CardSecondary';
import { renderCUI } from '@/utils/test-utils';

describe('CardSecondary Component', () => {
  const renderCard = (props: CardSecondaryProps) =>
    renderCUI(<CardSecondary {...props} />);

  it('should render the title', () => {
    const title = 'Test card component';
    renderCard({
      title,
      icon: 'warning',
      description: '',
      infoUrl: '',
      infoText: '',
    });

    expect(screen.getAllByText(title).length).toEqual(1);
  });

  it('should render the description when provided', () => {
    const description = 'This is the card description';
    renderCard({
      icon: 'warning',
      title: '',
      description,
      infoUrl: '',
      infoText: '',
    });

    expect(screen.getAllByText(description).length).toEqual(1);
  });

  it('should render the badge when hasBadge prop is present', () => {
    const badgeText = 'I should eat more bananas';
    renderCard({
      icon: 'warning',
      title: '',
      description: '',
      infoUrl: '',
      infoText: '',
      badgeText,
    });

    expect(screen.getAllByText(badgeText).length).toEqual(1);
  });

  it('should render an image when iconUrl is provided', () => {
    const iconUrl = 'https://example.com/icon.png';
    renderCard({
      iconUrl,
      title: 'Card with custom icon',
      description: '',
      infoUrl: '',
      infoText: '',
    });

    const imgElement = screen.getByAltText('card icon');
    expect(imgElement).toHaveAttribute('src', iconUrl);
  });

  it('should render the info text', () => {
    const infoText = 'hi there';
    renderCard({
      title: 'Test card component',
      icon: 'warning',
      description: '',
      infoUrl: '',
      infoText,
    });

    expect(screen.getAllByText(infoText).length).toEqual(1);
  });

  it('should render custom the info icon', () => {
    renderCard({
      title: 'Test card component',
      icon: 'warning',
      description: '',
      infoUrl: '',
      infoText: 'Read more',
      infoIcon: 'popout',
    });

    expect(screen.getAllByLabelText('popout').length).toEqual(1);
  });

  it('should render chevron-right by default', () => {
    renderCard({
      title: 'Test card component',
      icon: 'warning',
      description: '',
      infoUrl: '',
      infoText: 'Read more',
    });

    expect(screen.getAllByLabelText('chevron-right').length).toEqual(1);
  });
});
