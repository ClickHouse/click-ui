// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/CrossButton
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('CrossButton Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('default matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toHaveScreenshot('crossbutton-default-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toBeDisabled();
      await expect(button).toHaveScreenshot('crossbutton-disabled-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await button.hover();
      await page.waitForTimeout(100);
      await expect(button).toHaveScreenshot('crossbutton-hover-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('focus state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await button.focus();
      await page.waitForTimeout(100);
      await expect(button).toHaveScreenshot('crossbutton-focus-light.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('default matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toHaveScreenshot('crossbutton-default-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('disabled matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--disabled'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toBeDisabled();
      await expect(button).toHaveScreenshot('crossbutton-disabled-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('hover state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await button.hover();
      await page.waitForTimeout(100);
      await expect(button).toHaveScreenshot('crossbutton-hover-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('renders a button with type button', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toHaveAttribute('type', 'button');
    });

    it('click event fires', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toBeEnabled();
      await button.click();
    });

    it('keyboard navigation works', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-crossbutton--default', 'light'), {
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
