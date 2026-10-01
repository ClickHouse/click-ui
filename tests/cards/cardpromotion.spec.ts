// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/CardPromotion
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="card-promotion-harness"]';

describe('CardPromotion Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-promotion-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(harnessLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardpromotion-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('dismissible matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-promotion-card--dismissible', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(harnessLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const dismiss = page.getByTestId('click-alert-dismiss-button');
        await expect(dismiss).toBeVisible();
        await expect(card).toHaveScreenshot('cardpromotion-dismissible-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-promotion-card--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(harnessLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await page.getByText('Join us at AWS').hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardpromotion-hover-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-promotion-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(harnessLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await expect(card).toHaveScreenshot('cardpromotion-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('dismissible matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-promotion-card--dismissible'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(harnessLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        const dismiss = page.getByTestId('click-alert-dismiss-button');
        await expect(dismiss).toBeVisible();
        await expect(card).toHaveScreenshot('cardpromotion-dismissible-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('cards-promotion-card--default'), {
          waitUntil: 'networkidle',
        });
        const card = page.locator(harnessLocator).first();
        await expect(card).toBeVisible({ timeout: 10000 });
        await page.getByText('Join us at AWS').hover();
        await page.waitForTimeout(100);
        await expect(card).toHaveScreenshot('cardpromotion-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Behavior', () => {
    it('clicking dismiss removes the card', async ({ page }) => {
      await page.goto(getStoryUrl('cards-promotion-card--dismissible', 'light'), {
        waitUntil: 'networkidle',
      });
      const dismiss = page.getByTestId('click-alert-dismiss-button');
      await expect(dismiss).toBeVisible();
      await dismiss.click();
      await expect(page.getByText('Join us at AWS')).toHaveCount(0);
    });
  });
});
