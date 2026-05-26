import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const cardLocator = '[aria-disabled]';

describe('CardHorizontal Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('muted color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-muted-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--small', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-small-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('alignment top matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--alignment-top', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-alignment-top-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('selectable matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selectable', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-selectable-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-selected-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('cardhorizontal-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--disabled-selected', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-disabled-selected-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-badge', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const badge = page.getByTestId('horizontal-card-badge');
        await expect(badge).toBeVisible();
        await expect(card).toHaveScreenshot('cardhorizontal-with-badge-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-button', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const button = page.getByTestId('horizontal-card-button');
        await expect(button).toBeVisible();
        await expect(card).toHaveScreenshot('cardhorizontal-with-button-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state on selectable matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selectable', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardhorizontal-selectable-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state on selectable matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selectable', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardhorizontal-selectable-focus-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('hover state on default (non-selectable) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardhorizontal-default-hover-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('muted color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--muted'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-muted-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('small size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--small'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-small-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('alignment top matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--alignment-top'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-alignment-top-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('selectable matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selectable'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-selectable-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selected'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--disabled'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveAttribute('aria-disabled', 'true');
        await expect(card).toHaveScreenshot('cardhorizontal-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled selected matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--disabled-selected'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardhorizontal-disabled-selected-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with badge matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-badge'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const badge = page.getByTestId('horizontal-card-badge');
        await expect(badge).toBeVisible();
        await expect(card).toHaveScreenshot('cardhorizontal-with-badge-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--with-button'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const button = page.getByTestId('horizontal-card-button');
        await expect(button).toBeVisible();
        await expect(card).toHaveScreenshot('cardhorizontal-with-button-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state on selectable matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selectable'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardhorizontal-selectable-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state on selectable matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--selectable'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.focus();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardhorizontal-selectable-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('hover state on default (non-selectable) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-horizontal-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(cardLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await card.hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardhorizontal-default-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('enabled card is focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.locator(cardLocator).first();
      await expect(card).toBeVisible({ timeout: 10000 });

      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(card).toBeFocused();
    });

    it('disabled card exposes aria-disabled and tabIndex=-1', async ({ page }) => {
      await page.goto(getStoryUrl('cards-horizontal-card--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const card = page.locator(cardLocator).first();
      await expect(card).toHaveAttribute('aria-disabled', 'true');
      await expect(card).toHaveAttribute('tabIndex', '-1');
    });
  });
});
