import { screen } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';
import { CardPrimary, CardPrimaryProps } from '@/components/CardPrimary';

describe('CardPrimary Component', () => {
  describe('Primary card', () => {
    const renderCard = (props: CardPrimaryProps) => renderCUI(<CardPrimary {...props} />);

    it('should render the title', () => {
      const title = 'Test card component';
      renderCard({
        title,
        icon: 'warning',
        description: '',
        infoUrl: '',
        infoText: '',
      });

      expect(screen.getByText(title)).toBeDefined();
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

      expect(screen.getByText(description)).toBeDefined();
    });
    it('should render button when the infoUrl is provided', () => {
      const description = 'This is the card description';
      const { queryByRole } = renderCard({
        icon: 'warning',
        title: '',
        description,
        infoUrl: 'test',
        infoText: 'test',
      });

      expect(queryByRole('button')).not.toBeNull();
    });
    it('should not render button when the infoUrl is provided and length is 0', () => {
      const description = 'This is the card description';
      const { queryByRole } = renderCard({
        icon: 'warning',
        title: '',
        description,
        infoUrl: '',
        infoText: '',
      });

      expect(queryByRole('button')).toBeNull();
    });

    it('should render button when onButtonClick is provided', () => {
      const description = 'This is the card description';
      const { queryByRole } = renderCard({
        icon: 'warning',
        title: '',
        description,
        onButtonClick: () => null,
        infoText: 'test1',
      });

      expect(queryByRole('button')).not.toBeNull();
    });

    it('should render the top badge', () => {
      const topBadgeText = 'TopBadge';
      const { queryAllByText } = renderCard({
        topBadgeText,
        icon: 'warning',
        title: '',
        onButtonClick: () => null,
        infoText: 'test1',
      });

      expect(queryAllByText(topBadgeText).length).toEqual(1);
    });

    it('should not render the top badge', () => {
      const { queryAllByTestId } = renderCard({
        icon: 'warning',
        title: '',
        onButtonClick: () => null,
        infoText: 'test1',
      });

      expect(queryAllByTestId('card-top-badge').length).toEqual(0);
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
  });
});
