import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="label-harness"]';

describe('Label Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('label-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('label-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('error matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--error', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('label-error-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const label = harness.locator('label').first();
        await label.hover();
        await page.waitForTimeout(100);
        await expect(harness).toHaveScreenshot('label-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus-within state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const input = harness.locator('input').first();
        await input.focus();
        await page.waitForTimeout(100);
        await expect(harness).toHaveScreenshot('label-focus-within-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Variants', () => {
      it('default matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--default'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('label-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--disabled'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('label-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('error matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--error'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('label-error-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--default'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const label = harness.locator('label').first();
        await label.hover();
        await page.waitForTimeout(100);
        await expect(harness).toHaveScreenshot('label-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus-within state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-label--default'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        const input = harness.locator('input').first();
        await input.focus();
        await page.waitForTimeout(100);
        await expect(harness).toHaveScreenshot('label-focus-within-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
