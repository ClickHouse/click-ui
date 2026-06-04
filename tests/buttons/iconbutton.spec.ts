// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/IconButton
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('IconButton Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Type Variants', () => {
      it('primary icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-primary-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--secondary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-secondary-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('ghost icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--ghost', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-ghost-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--danger', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-danger-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('info icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--info', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-info-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled State', () => {
      it('disabled icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('iconbutton-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Size Variants', () => {
      it('small icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--small', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-small-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('extra small icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--extra-small', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-extra-small-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('iconbutton-primary-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('iconbutton-primary-focus-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('active/pressed state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        const box = await button.boundingBox();
        if (!box) {
          throw new Error('Button bounding box is null - element may not be in viewport');
        }
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('iconbutton-primary-active-light.png', {
          maxDiffPixels: 100,
        });
        await page.mouse.up();
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Type Variants', () => {
      it('primary icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-primary-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--secondary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-secondary-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('ghost icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--ghost'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-ghost-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--danger'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-danger-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('info icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--info'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-info-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled State', () => {
      it('disabled icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('iconbutton-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Size Variants', () => {
      it('small icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--small'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-small-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('extra small icon button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--extra-small'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('iconbutton-extra-small-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('iconbutton-primary-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('iconbutton-primary-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('active/pressed state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-iconbutton--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        const box = await button.boundingBox();
        if (!box) {
          throw new Error('Button bounding box is null - element may not be in viewport');
        }
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('iconbutton-primary-active-dark.png', {
          maxDiffPixels: 100,
        });
        await page.mouse.up();
      });
    });
  });

  describe('Events and Accessibility', () => {
    it('disabled button prevents click', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-iconbutton--disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeDisabled();
    });

    it('keyboard navigation works', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-iconbutton--primary', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
    });

    it('icon name is exposed as accessible label', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-iconbutton--primary', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toHaveAttribute('aria-label', 'user');
    });
  });
});
