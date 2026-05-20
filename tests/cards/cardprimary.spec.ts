import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const cardLocator = '[aria-disabled]';

describe('CardPrimary Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--small', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-small-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('align start matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-start', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-align-start-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('align end matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-end', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-align-end-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with shadow matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-shadow', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-shadow-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-selected-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('cardprimary-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('without button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--without-button', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-without-button-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Top Badge', () => {
      it('with top badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-top-badge', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const badge = page.getByTestId('card-top-badge');
        await expect(badge).toBeVisible();
        const wrapper = card.locator('..');
        await expect(wrapper).toHaveScreenshot('cardprimary-top-badge-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with top badge selected matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-primary-card--with-top-badge-selected', 'light'),
          { waitUntil: 'networkidle' }
        );
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const badge = page.getByTestId('card-top-badge');
        await expect(badge).toBeVisible();
        const wrapper = card.locator('..');
        await expect(wrapper).toHaveScreenshot(
          'cardprimary-top-badge-selected-light.png',
          { maxDiffPixels: 100 }
        );
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardprimary-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardprimary-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--small'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-small-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('align start matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-start'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-align-start-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('align end matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--align-end'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-align-end-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with shadow matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-shadow'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-shadow-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--selected'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--disabled'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('cardprimary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('without button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--without-button'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardprimary-without-button-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Top Badge', () => {
      it('with top badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--with-top-badge'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const badge = page.getByTestId('card-top-badge');
        await expect(badge).toBeVisible();
        const wrapper = card.locator('..');
        await expect(wrapper).toHaveScreenshot('cardprimary-top-badge-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with top badge selected matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('cards-primary-card--with-top-badge-selected'),
          { waitUntil: 'networkidle' }
        );
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const badge = page.getByTestId('card-top-badge');
        await expect(badge).toBeVisible();
        const wrapper = card.locator('..');
        await expect(wrapper).toHaveScreenshot(
          'cardprimary-top-badge-selected-dark.png',
          { maxDiffPixels: 100 }
        );
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardprimary-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-primary-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardprimary-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('card is focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('cards-primary-card--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.locator(cardLocator).first();
      await expect(card).toBeVisible({ timeout: 10000 });

      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(card).toBeFocused();
    });

    it('disabled card exposes aria-disabled', async ({ page }) => {
      await page.goto(getStoryUrl('cards-primary-card--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.locator(cardLocator).first();
      await expect(card).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
