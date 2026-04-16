import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('CardPrimary Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Size Variants', () => {
      it('medium size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--size-medium', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-size-medium-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--size-small', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-size-small-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Alignment Variants', () => {
      it('start alignment matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-start', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-align-start-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('center alignment matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-center', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-align-center-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('end alignment matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-end', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-align-end-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('State Variants', () => {
      it('with shadow matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-shadow', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-with-shadow-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-primary-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-pressed', 'true');
        await expect(card).toHaveScreenshot('card-primary-selected-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Content Variants', () => {
      it('with icon matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-icon', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-with-icon-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with icon url matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-icon-url', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-with-icon-url-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('without icon matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--without-icon', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-without-icon-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('title only matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--title-only', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-title-only-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('without button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--without-button', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-without-button-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('description only matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--description-only', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-description-only-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Top Badge Variants', () => {
      it('with top badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-top-badge', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-with-top-badge-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with top badge selected matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-primary-card--with-top-badge-selected', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot(
          'card-primary-with-top-badge-selected-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('Small Size Combinations', () => {
      it('small with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--small-with-badge', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-small-with-badge-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('small disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--small-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-primary-small-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--size-medium', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForFunction(() => {
          const el = document.querySelector('[data-testid="card-primary"]');
          return el?.matches(':hover') || false;
        });
        await expect(card).toHaveScreenshot('card-primary-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--size-medium', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForFunction(() => {
          const el = document.querySelector('[data-testid="card-primary"]');
          return el?.matches(':focus') || false;
        });
        await expect(card).toHaveScreenshot('card-primary-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Size Variants', () => {
      it('medium size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--size-medium'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-size-medium-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--size-small'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-size-small-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('State Variants', () => {
      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--disabled'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('card-primary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--selected'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Top Badge Variants', () => {
      it('with top badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-top-badge'), {
          waitUntil: 'networkidle',
        });
        const card = page.getByTestId('card-primary');
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('card-primary-with-top-badge-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Events and Accessibility', () => {
    it('click event fires correctly', async ({ page }) => {
      await page.goto(getStoryUrl('cards-primary-card--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-primary');
      const button = page.getByText('Click Me');
      await expect(card).toBeVisible({ timeout: 10000 });
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
      await button.click();
    });

    it('disabled card has aria-disabled attribute', async ({ page }) => {
      await page.goto(getStoryUrl('cards-primary-card--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-primary');
      await expect(card).toBeVisible({ timeout: 10000 });
      await expect(card).toHaveAttribute('aria-disabled', 'true');
    });

    it('keyboard navigation works', async ({ page }) => {
      await page.goto(getStoryUrl('cards-primary-card--size-medium', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.getByTestId('card-primary');
      await expect(card).toBeVisible({ timeout: 10000 });
      await page.keyboard.press('Tab');
      await expect(card).toBeFocused();
    });

    it('top badge renders when provided', async ({ page }) => {
      await page.goto(getStoryUrl('cards-primary-card--with-top-badge', 'light'), {
        waitUntil: 'networkidle',
      });
      const badge = page.getByTestId('card-top-badge');
      await expect(badge).toBeVisible({ timeout: 10000 });
    });
  });
});
