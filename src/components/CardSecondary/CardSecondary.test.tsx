import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardSecondary, CardSecondaryProps } from '@/components/CardSecondary';
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

  describe('keyboard', () => {
    const getCard = (container: HTMLElement) => container.firstChild as HTMLElement;

    it.each(['{Enter}', ' '])(
      'should call onClick on "%s" and expose a button',
      async key => {
        const onClick = vitest.fn();
        const { container } = renderCard({
          title: 'Test Card',
          description: 'Desc',
          onClick,
        });

        const card = screen.getByRole('button', { name: /Test Card/ });
        expect(card).toBe(getCard(container));
        card.focus();
        await userEvent.keyboard(key);

        expect(onClick).toHaveBeenCalledTimes(1);
      }
    );

    it('should run the consumer onKeyDown and still activate', () => {
      const onClick = vitest.fn();
      const onKeyDown = vitest.fn();
      const { container } = renderCard({
        title: 'Test Card',
        description: 'Desc',
        onClick,
        onKeyDown,
      });

      fireEvent.keyDown(getCard(container), { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should stay a link, not a button, with infoUrl and no infoText', () => {
      const { container } = renderCard({
        title: 'Test Card',
        description: 'Desc',
        infoUrl: 'https://example.com',
        onClick: vitest.fn(),
      });

      expect(getCard(container)).not.toHaveAttribute('role');
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should hide the info icon from the button name', () => {
      renderCard({
        title: 'Test Card',
        description: 'Desc',
        infoText: 'Read more',
        onClick: vitest.fn(),
      });

      expect(screen.getByRole('button')).toHaveAccessibleName('Test Card Desc Read more');
    });

    it('should not run a consumer onClick on a disabled card', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({
        title: 'Test Card',
        description: 'Desc',
        onClick,
        disabled: true,
      });

      fireEvent.click(getCard(container));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should activate only once while Space is held and keep the page from scrolling', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({
        title: 'Test Card',
        description: 'Desc',
        onClick,
      });

      const card = getCard(container);
      expect(fireEvent.keyDown(card, { key: ' ' })).toBe(false);
      expect(fireEvent.keyDown(card, { key: ' ', repeat: true })).toBe(false);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should leave the keys to the info link and not be a button itself', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({
        title: 'Test Card',
        description: 'Desc',
        infoUrl: 'https://example.com',
        infoText: 'Read more',
        onClick,
      });

      const card = getCard(container);
      expect(card).not.toHaveAttribute('role');
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(fireEvent.keyDown(card, { key: 'Enter' })).toBe(true);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should keep the default key behavior on a display-only or disabled card', () => {
      const onClick = vitest.fn();
      const plain = getCard(
        renderCard({ title: 'Summary', description: 'Desc' }).container
      );
      expect(plain).not.toHaveAttribute('role');
      expect(fireEvent.keyDown(plain, { key: ' ' })).toBe(true);

      const disabled = getCard(
        renderCard({ title: 'Test Card', description: 'Desc', onClick, disabled: true })
          .container
      );
      fireEvent.keyDown(disabled, { key: 'Enter' });
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
