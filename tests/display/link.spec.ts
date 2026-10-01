// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Link
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="link-harness"]';

describe('Link Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-xs', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-xs-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-lg', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-lg-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Weight Variants', () => {
      it('normal weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-normal', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-normal-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('medium weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-medium', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-medium-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('semibold weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-semibold', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-semibold-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('bold weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-bold', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-bold-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Icon Variants', () => {
      it('with icon (md) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--with-icon', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-with-icon-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('with icon (sm) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--with-icon-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-with-icon-sm-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const link = harness.getByRole('link').first();
        await link.hover();
        // Wait past the 100ms transition.default before screenshotting
        await page.waitForTimeout(200);
        await expect(harness).toHaveScreenshot('link-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        // Anchor focus into page content (not browser chrome) to avoid flakiness
        await page.locator('body').click();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await expect(harness).toHaveScreenshot('link-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-xs'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-xs-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--size-lg'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-size-lg-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Weight Variants', () => {
      it('normal weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-normal'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-normal-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('medium weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-medium'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-medium-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('semibold weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-semibold'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-semibold-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('bold weight matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--weight-bold'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-weight-bold-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Icon Variants', () => {
      it('with icon (md) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--with-icon'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-with-icon-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('with icon (sm) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--with-icon-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('link-with-icon-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--default'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const link = harness.getByRole('link').first();
        await link.hover();
        await page.waitForTimeout(200);
        await expect(harness).toHaveScreenshot('link-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('typography-link--default'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await page.locator('body').click();
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
        await expect(harness).toHaveScreenshot('link-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
