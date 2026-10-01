import { screen } from '@testing-library/react';
import { CardPromotion, CardPromotionProps } from '@/components/CardPromotion';
import { renderCUI } from '@/utils/test-utils';

describe('CardPromo Component', () => {
  describe('Promotional card', () => {
    const renderCard = (props: CardPromotionProps) =>
      renderCUI(<CardPromotion {...props} />);

    it('should render the label', () => {
      const label = 'Test card component';
      renderCard({
        label,
        icon: 'star',
      });

      expect(screen.getByText(label)).toBeDefined();
    });

    it('renders the dismiss button with type="button" so it does not submit a form', () => {
      renderCard({
        label: 'Dismissible card',
        icon: 'star',
        dismissible: true,
      });

      expect(screen.getByTestId('click-alert-dismiss-button')).toHaveAttribute(
        'type',
        'button'
      );
    });
  });
});
