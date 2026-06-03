import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('Switch Visual Regression', () => {
  describe('Light Theme', () => {
    describe('States', () => {
      it('default (unchecked) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveAttribute('data-state', 'unchecked');
        await expect(toggle).toHaveScreenshot('switch-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveAttribute('data-state', 'checked');
        await expect(toggle).toHaveScreenshot('switch-checked-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toBeDisabled();
        await expect(toggle).toHaveScreenshot('switch-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--disabled-checked', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveAttribute('data-state', 'checked');
        await expect(toggle).toBeDisabled();
        await expect(toggle).toHaveScreenshot('switch-disabled-checked-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Layout', () => {
      it('orientation vertical with dir start matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('forms-switch--orientation-vertical-dir-start', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        const wrapper = toggle.locator('..');
        await expect(wrapper).toHaveScreenshot('switch-vertical-start-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('orientation horizontal with dir start matches snapshot', async ({ page }) => {
        await page.goto(
          getStoryUrl('forms-switch--orientation-horizontal-dir-start', 'light'),
          {
            waitUntil: 'networkidle',
          }
        );
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        const wrapper = toggle.locator('..');
        await expect(wrapper).toHaveScreenshot('switch-horizontal-start-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('without label matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--no-label', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveScreenshot('switch-no-label-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await toggle.hover();
        await page.waitForTimeout(100);
        await expect(toggle).toHaveScreenshot('switch-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--default', 'light'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await page.locator('body').click();
        await page.keyboard.press('Tab');
        await expect(toggle).toBeFocused();
        await expect(toggle).toHaveScreenshot('switch-focus-light.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Dark Theme', () => {
    use({ colorScheme: 'dark' });

    describe('States', () => {
      it('default (unchecked) matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--default'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveAttribute('data-state', 'unchecked');
        await expect(toggle).toHaveScreenshot('switch-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--checked'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveAttribute('data-state', 'checked');
        await expect(toggle).toHaveScreenshot('switch-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--disabled'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toBeDisabled();
        await expect(toggle).toHaveScreenshot('switch-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('disabled checked matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('forms-switch--disabled-checked'), {
          waitUntil: 'networkidle',
        });
        const toggle = page.getByRole('switch');
        await expect(toggle).toBeVisible({ timeout: 10000 });
        await expect(toggle).toHaveAttribute('data-state', 'checked');
        await expect(toggle).toBeDisabled();
        await expect(toggle).toHaveScreenshot('switch-disabled-checked-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('exposes role=switch', async ({ page }) => {
      await page.goto(getStoryUrl('forms-switch--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const toggle = page.getByRole('switch');
      await expect(toggle).toBeVisible({ timeout: 10000 });
    });

    it('Space key toggles the switch', async ({ page }) => {
      await page.goto(getStoryUrl('forms-switch--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const toggle = page.getByRole('switch');
      await expect(toggle).toHaveAttribute('data-state', 'unchecked');
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(toggle).toBeFocused();
      await page.keyboard.press('Space');
      await expect(toggle).toHaveAttribute('data-state', 'checked');
    });

    it('disabled switch is not focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('forms-switch--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const toggle = page.getByRole('switch');
      await expect(toggle).toBeDisabled();
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(toggle).not.toBeFocused();
    });
  });
});
