import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="title-harness"]';

const variants = [
  { story: 'size-xs', name: 'size-xs' },
  { story: 'size-sm', name: 'size-sm' },
  { story: 'size-md', name: 'size-md' },
  { story: 'size-lg', name: 'size-lg' },
  { story: 'size-xl', name: 'size-xl' },
  { story: 'family-product', name: 'family-product' },
  { story: 'family-brand', name: 'family-brand' },
  { story: 'color-default', name: 'color-default' },
  { story: 'color-muted', name: 'color-muted' },
  { story: 'align-left', name: 'align-left' },
  { story: 'align-center', name: 'align-center' },
  { story: 'align-right', name: 'align-right' },
  { story: 'heading-levels', name: 'heading-levels' },
  { story: 'with-link', name: 'with-link' },
] as const;

describe('Title Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`typography-title--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`title-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }

    it('link hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('typography-title--with-link', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await harness.locator('a').first().hover();
      await page.waitForTimeout(100);
      await expect(harness).toHaveScreenshot('title-link-hover-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`typography-title--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`title-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }

    it('link hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('typography-title--with-link'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await harness.locator('a').first().hover();
      await page.waitForTimeout(100);
      await expect(harness).toHaveScreenshot('title-link-hover-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
