// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/SplitButton
// @covers src/components/Button
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="split-button-harness"]';

describe('SplitButton Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('primary matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-primary-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('secondary matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--secondary', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-secondary-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('primary disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-primary-disabled-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('secondary disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--secondary-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-secondary-disabled-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('primary with icon matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary-with-icon', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-primary-with-icon-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('fill width matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--fill-width', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-fill-width-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await harness.getByRole('button').first().hover();
      await page.waitForTimeout(100);
      await expect(harness).toHaveScreenshot('splitbutton-hover-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('focus state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await harness.getByRole('button').first().focus();
      await page.waitForTimeout(100);
      await expect(harness).toHaveScreenshot('splitbutton-focus-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('primary matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-primary-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('secondary matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--secondary'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-secondary-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('primary disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary-disabled'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('splitbutton-primary-disabled-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('primary action button is present and enabled', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      const primary = harness.getByRole('button').first();
      await expect(primary).toBeVisible();
      await expect(primary).toBeEnabled();
    });

    it('disabled primary action button reports disabled', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      const primary = harness.getByRole('button').first();
      await expect(primary).toBeDisabled();
    });
  });
});
