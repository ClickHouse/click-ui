import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('SplitButton Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Button Types', () => {
      it('primary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('splitbutton-primary-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--secondary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('splitbutton-secondary-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('primary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('splitbutton-primary-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--secondary-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot(
          'splitbutton-secondary-disabled-light.png',
          {
            maxDiffPixels: 100,
          }
        );
      });
    });

    describe('Interactive States', () => {
      it('hover state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('splitbutton-primary-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('splitbutton-primary-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Button Types', () => {
      it('primary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('splitbutton-primary-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--secondary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('splitbutton-secondary-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('primary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary-disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('splitbutton-primary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--secondary-disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('splitbutton-secondary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('splitbutton-primary-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-splitbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button').first();
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('splitbutton-primary-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Events and Accessibility', () => {
    it('click event fires correctly', async ({ page }) => {
      const consoleMessages: string[] = [];
      page.on('console', msg => consoleMessages.push(msg.text()));

      await page.goto(getStoryUrl('buttons-splitbutton--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button').first();
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toBeEnabled();

      await button.click();

      // Verify console log was triggered
      expect(consoleMessages.some(msg => msg.includes('clicked'))).toBe(true);
    });

    it('disabled button prevents click', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-splitbutton--primary-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button').first();
      await expect(button).toBeDisabled();
    });

    it('keyboard navigation works', async ({ page }) => {
      const consoleMessages: string[] = [];
      page.on('console', msg => consoleMessages.push(msg.text()));

      await page.goto(getStoryUrl('buttons-splitbutton--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button').first();
      await expect(button).toBeVisible({ timeout: 10000 });

      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
      await page.keyboard.press('Enter');

      // Verify console log was triggered
      expect(consoleMessages.some(msg => msg.includes('clicked'))).toBe(true);
    });
  });
});
