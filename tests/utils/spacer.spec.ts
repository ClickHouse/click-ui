import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from './index';

const { describe, use } = it;

const harnessLocator = '[data-testid="spacer-harness"]';

describe('Spacer Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-xs', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-xs-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-lg', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-lg-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-xl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-xl-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-xxl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-xxl-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('default size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--default-size', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-default-size-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-xs'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-xs-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-lg'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-lg-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-xl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-xl-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--size-xxl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-size-xxl-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('default size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-spacer--default-size'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('spacer-default-size-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
