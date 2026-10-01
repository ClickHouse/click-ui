// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/CardSecondary
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const cardLocator = '[aria-disabled]';

describe('CardSecondary Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--with-badge', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-with-badge-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with shadow matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--with-shadow', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-with-shadow-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with custom icon matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--with-custom-icon', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-with-custom-icon-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('cardsecondary-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardsecondary-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardsecondary-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--with-badge'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-with-badge-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with shadow matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--with-shadow'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-with-shadow-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with custom icon matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--with-custom-icon'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardsecondary-with-custom-icon-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--disabled'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('cardsecondary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardsecondary-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-secondary-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardsecondary-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('enabled card is focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('cards-secondary-card--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.locator(cardLocator).first();
      await expect(card).toBeVisible({ timeout: 10000 });

      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(card).toBeFocused();
    });

    it('disabled card exposes aria-disabled', async ({ page }) => {
      await page.goto(getStoryUrl('cards-secondary-card--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.locator(cardLocator).first();
      await expect(card).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
