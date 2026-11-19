import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderCUI } from '@/utils/test-utils';
import { CardPrimary, CardPrimaryProps } from '@/components/CardPrimary';

describe('CardPrimary Component', () => {
  describe('Primary card', () => {
    const renderCard = (props: CardPrimaryProps) => renderCUI(<CardPrimary {...props} />);

    afterEach(() => {
      vitest.restoreAllMocks();
    });

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
        topBadgeText: topBadgeText,
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

    it('should open infoUrl in a new tab without exposing window.opener', async () => {
      const windowOpenSpy = vitest.spyOn(window, 'open').mockImplementation(() => null);
      const { getByRole } = renderCard({
        icon: 'warning',
        title: 'Test Card',
        description: '',
        infoUrl: 'https://example.com',
        infoText: 'Learn more',
      });

      await userEvent.click(getByRole('button'));

      expect(windowOpenSpy).toHaveBeenCalledTimes(1);
      expect(windowOpenSpy).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener'
      );
    });

    it('should open a relative infoUrl', async () => {
      const windowOpenSpy = vitest.spyOn(window, 'open').mockImplementation(() => null);
      const { getByRole } = renderCard({
        icon: 'warning',
        title: 'Test Card',
        description: '',
        infoUrl: '/docs/getting-started',
        infoText: 'Learn more',
      });

      await userEvent.click(getByRole('button'));

      expect(windowOpenSpy).toHaveBeenCalledTimes(1);
      expect(windowOpenSpy).toHaveBeenCalledWith(
        '/docs/getting-started',
        '_blank',
        'noopener'
      );
    });

    it('should not open a non-http(s) infoUrl', async () => {
      const windowOpenSpy = vitest.spyOn(window, 'open').mockImplementation(() => null);
      const { getByRole } = renderCard({
        icon: 'warning',
        title: 'Test Card',
        description: '',
        infoUrl: 'javascript:alert(1)',
        infoText: 'Learn more',
      });
      const warnSpy = vitest.spyOn(console, 'warn').mockImplementation(() => undefined);

      await userEvent.click(getByRole('button'));

      expect(windowOpenSpy).not.toHaveBeenCalled();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('javascript:alert(1)');
    });
  });

  describe('keyboard', () => {
    const renderCard = (props: CardPrimaryProps) => renderCUI(<CardPrimary {...props} />);
    const getCard = (container: HTMLElement) =>
      container.querySelector('[aria-disabled]') as HTMLElement;

    it.each(['{Enter}', ' '])(
      'should call onClick on "%s" and expose a button',
      async key => {
        const onClick = vitest.fn();
        const { container } = renderCard({ title: 'Test Card', onClick });

        const card = screen.getByRole('button', { name: /Test Card/ });
        expect(card).toBe(getCard(container));
        card.focus();
        await userEvent.keyboard(key);

        expect(onClick).toHaveBeenCalledTimes(1);
      }
    );

    it('should activate only once while Space is held and keep the page from scrolling', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({ title: 'Test Card', onClick });

      const card = getCard(container);
      expect(fireEvent.keyDown(card, { key: ' ' })).toBe(false);
      expect(fireEvent.keyDown(card, { key: ' ', repeat: true })).toBe(false);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should leave other keys and keys from controls inside the card alone', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({
        title: 'Test Card',
        onClick,
        children: <input aria-label="Name" />,
      });

      expect(fireEvent.keyDown(getCard(container), { key: 'Tab' })).toBe(true);
      expect(fireEvent.keyDown(screen.getByRole('textbox'), { key: ' ' })).toBe(true);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should run the consumer onKeyDown and still activate', () => {
      const onClick = vitest.fn();
      const onKeyDown = vitest.fn();
      const { container } = renderCard({ title: 'Test Card', onClick, onKeyDown });

      fireEvent.keyDown(getCard(container), { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it.each([
      ['infoText only', { infoText: 'Go' }],
      ['infoUrl without infoText', { infoUrl: 'https://example.com' }],
      ['onButtonClick without infoText', { onButtonClick: vitest.fn() }],
    ])('should be the only button when it has %s', (_name, extra) => {
      const onClick = vitest.fn();
      renderCard({ title: 'Test Card', onClick, ...extra });

      fireEvent.keyDown(screen.getByRole('button', { name: /Test Card/ }), {
        key: 'Enter',
      });

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not run a consumer onClick on a disabled card', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({ title: 'Test Card', onClick, disabled: true });

      fireEvent.click(getCard(container));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should leave the keys to the inner button and not be a button itself', () => {
      const onClick = vitest.fn();
      const { container } = renderCard({
        title: 'Test Card',
        infoText: 'Go',
        onButtonClick: vitest.fn(),
        onClick,
      });

      const card = getCard(container);
      expect(card).not.toHaveAttribute('role');
      expect(fireEvent.keyDown(card, { key: 'Enter' })).toBe(true);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should keep the default key behavior on a display-only or disabled card', () => {
      const onClick = vitest.fn();
      const plain = getCard(renderCard({ title: 'Summary' }).container);
      expect(plain).not.toHaveAttribute('role');
      expect(plain).not.toHaveAttribute('tabIndex');
      expect(fireEvent.keyDown(plain, { key: ' ' })).toBe(true);

      const disabled = getCard(
        renderCard({ title: 'Test Card', onClick, disabled: true }).container
      );
      fireEvent.keyDown(disabled, { key: 'Enter' });
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
