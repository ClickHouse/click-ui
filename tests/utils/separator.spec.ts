import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from './index';

const { describe, use } = it;

const harnessLocator = '[data-testid="separator-harness"]';

describe('Separator Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Horizontal Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-xs', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-xs-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-lg', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-lg-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-xl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-xl-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-xxl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-xxl-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Vertical Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-xs', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-xs-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-lg', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-lg-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-xl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-xl-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-xxl', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-xxl-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Default Orientation', () => {
      it('default orientation matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--default-orientation', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-default-orientation-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Horizontal Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-xs'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-xs-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-lg'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-lg-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-xl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-xl-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--horizontal-xxl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-horizontal-xxl-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Vertical Size Variants', () => {
      it('xs size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-xs'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-xs-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('sm size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('lg size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-lg'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-lg-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-xl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-xl-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('xxl size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--vertical-xxl'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-vertical-xxl-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Default Orientation', () => {
      it('default orientation matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-separator--default-orientation'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('separator-default-orientation-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
