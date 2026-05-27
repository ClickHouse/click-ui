import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from './index';

const { describe, use } = it;

const harnessLocator = '[data-testid="icon-harness"]';

describe('Icon Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Size Variants', () => {
      it('default size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--default-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-default-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-xs', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-xs-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-lg', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-lg-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-xl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-xl-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-xxl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-xxl-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('State Variants', () => {
      it('success state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-success', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-success-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('warning state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-warning', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-warning-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-danger', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-danger-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('info state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-info', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-info-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('success state with sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-success-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-success-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('success state with xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-success-xl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-success-xl-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Custom Overrides', () => {
      it('custom color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--custom-color', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-custom-color-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('custom width/height matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--custom-width-height', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-custom-width-height-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Asset Variants', () => {
      it('flag asset matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--flag-asset', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-flag-asset-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('logo asset matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--logo-asset', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-logo-asset-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('payment asset matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--payment-asset', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-payment-asset-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Accessibility', () => {
      it('glyph icon exposes accessible name', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--default-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const img = harness.getByRole('img');
        await expect(img).toHaveAttribute('aria-label', 'users');
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Size Variants', () => {
      it('default size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--default-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-default-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-xs'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-xs-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-lg'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-lg-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-xl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-xl-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--size-xxl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-size-xxl-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('State Variants', () => {
      it('success state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-success'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-success-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('warning state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-warning'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-warning-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-danger'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-danger-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('info state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-info'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-info-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('success state with sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-success-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-success-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('success state with xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--state-success-xl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-state-success-xl-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Custom Overrides', () => {
      it('custom color matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--custom-color'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-custom-color-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('custom width/height matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--custom-width-height'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-custom-width-height-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Asset Variants', () => {
      it('flag asset matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--flag-asset'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-flag-asset-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('logo asset matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--logo-asset'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-logo-asset-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('payment asset matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('assets-icon--payment-asset'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('icon-payment-asset-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
