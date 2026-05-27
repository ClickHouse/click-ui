import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="avatar-harness"]';

describe('Avatar Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Text Fallback Variants', () => {
      it('sm text fallback matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-fallback-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md text fallback matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-fallback-md-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('single word text matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-single-word', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-single-word-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('single char text matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-single-char', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-single-char-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('default text size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--default-text-size', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-default-text-size-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('sm text fallback hover matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-sm', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await harness.hover();
        await expect(harness).toHaveScreenshot('avatar-text-fallback-sm-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('md text fallback hover matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-md', 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await harness.hover();
        await expect(harness).toHaveScreenshot('avatar-text-fallback-md-hover-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Text Fallback Variants', () => {
      it('sm text fallback matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-fallback-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md text fallback matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-fallback-md-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('single word text matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-single-word'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-single-word-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('single char text matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-single-char'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-text-single-char-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('default text size matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--default-text-size'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot('avatar-default-text-size-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('sm text fallback hover matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-sm'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await harness.hover();
        await expect(harness).toHaveScreenshot('avatar-text-fallback-sm-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('md text fallback hover matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('display-avatar--text-fallback-md'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await harness.hover();
        await expect(harness).toHaveScreenshot('avatar-text-fallback-md-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });
});
