// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/EmptyButton
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="emptybutton-harness"]';

describe('EmptyButton Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('default matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('emptybutton-default-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      const button = page.getByRole('button');
      await expect(button).toBeDisabled();
      await expect(harness).toHaveScreenshot('emptybutton-disabled-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.getByRole('button').hover();
      await page.waitForTimeout(100);
      await expect(harness).toHaveScreenshot('emptybutton-hover-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('focus state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.getByRole('button').focus();
      await page.waitForTimeout(100);
      await expect(harness).toHaveScreenshot('emptybutton-focus-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('default matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--default'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness).toHaveScreenshot('emptybutton-default-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--disabled'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      const button = page.getByRole('button');
      await expect(button).toBeDisabled();
      await expect(harness).toHaveScreenshot('emptybutton-disabled-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('click event fires', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toBeEnabled();
      await button.click();
    });

    it('disabled button reports disabled', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeDisabled();
    });

    it('keyboard navigation works', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-emptybutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
      await page.keyboard.press('Enter');
    });
  });
});
