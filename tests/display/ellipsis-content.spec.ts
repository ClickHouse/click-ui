// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/EllipsisContent
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="ellipsis-content-harness"]';

describe('EllipsisContent Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-truncated-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('not truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--not-truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-not-truncated-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('as span matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--as-span', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-as-span-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('with child element matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--with-child-element', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-with-child-element-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--truncated'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-truncated-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('not truncated text matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--not-truncated'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-not-truncated-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('as span matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--as-span'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-as-span-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('with child element matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--with-child-element'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('ellipsis-content-with-child-element-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Title attribute on overflow (existing behavior)', () => {
    it('sets the title attribute to the text when it overflows', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page
        .locator(`${harnessLocator} > *`)
        .first();
      await expect(content).toHaveAttribute(
        'title',
        'This is a very long line of text that should be truncated'
      );
    });

    it('does not set the title attribute when text fits', async ({ page }) => {
      await page.goto(getStoryUrl('display-ellipsiscontent--not-truncated', 'light'), {
        waitUntil: 'networkidle',
      });
      const content = page
        .locator(`${harnessLocator} > *`)
        .first();
      await expect(content).not.toHaveAttribute('title', /.+/);
    });
  });
});
