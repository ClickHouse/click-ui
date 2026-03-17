import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

describe('Button Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Button Types', () => {
      it('primary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-primary-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--secondary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-secondary-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('empty button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--empty', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-empty-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--danger', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-danger-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Loading States', () => {
      it('primary loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary-loading', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-primary-loading-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--secondary-loading', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-secondary-loading-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('empty loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--empty-loading', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-empty-loading-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--danger-loading', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-danger-loading-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('primary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-primary-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--secondary-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-secondary-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('empty disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--empty-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-empty-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--danger-disabled', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-danger-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('With Icons', () => {
      it('icon left matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--with-icon-left', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-icon-left-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('icon right matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--with-icon-right', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-icon-right-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('icons both matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--with-icons-both', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-icons-both-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Layout Variants', () => {
      it('fill width matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--fill-width', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-fill-width-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('align left matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--align-left', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-align-left-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('button-primary-hover-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('button-primary-focus-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('active/pressed state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary', 'light'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        const box = await button.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.waitForTimeout(100);
          await expect(button).toHaveScreenshot('button-primary-active-light.png', {
            maxDiffPixels: 100,
          });
          await page.mouse.up();
        }
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Button Types', () => {
      it('primary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-primary-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--secondary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-secondary-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('empty button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--empty'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-empty-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger button matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--danger'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-danger-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Loading States', () => {
      it('primary loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary-loading'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-primary-loading-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--secondary-loading'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-secondary-loading-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('empty loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--empty-loading'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-empty-loading-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger loading matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--danger-loading'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-danger-loading-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Disabled States', () => {
      it('primary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary-disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-primary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('secondary disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--secondary-disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-secondary-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('empty disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--empty-disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-empty-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('danger disabled matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--danger-disabled'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toBeDisabled();
        await expect(button).toHaveScreenshot('button-danger-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('With Icons', () => {
      it('icon left matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--with-icon-left'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-icon-left-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('icon right matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--with-icon-right'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-icon-right-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('icons both matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--with-icons-both'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-icons-both-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Layout Variants', () => {
      it('fill width matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--fill-width'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-fill-width-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('align left matches snapshot', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--align-left'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await expect(button).toHaveScreenshot('button-align-left-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Interactive States', () => {
      it('hover state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.hover();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('button-primary-hover-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('focus state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        await button.focus();
        await page.waitForTimeout(100);
        await expect(button).toHaveScreenshot('button-primary-focus-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('active/pressed state - primary', async ({ page }) => {
        await page.goto(getStoryUrl('buttons-button--primary'), {
          waitUntil: 'networkidle',
        });
        const button = page.getByRole('button');
        await expect(button).toBeVisible({ timeout: 10000 });
        const box = await button.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.waitForTimeout(100);
          await expect(button).toHaveScreenshot('button-primary-active-dark.png', {
            maxDiffPixels: 100,
          });
          await page.mouse.up();
        }
      });
    });
  });

  describe('Events and Accessibility', () => {
    it('click event fires correctly', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-button--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await expect(button).toBeEnabled();
      await button.click();
    });

    it('disabled button prevents click', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-button--primary-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('loading button prevents click', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-button--primary-loading', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('keyboard navigation works', async ({ page }) => {
      await page.goto(getStoryUrl('buttons-button--interactive', 'light'), {
        waitUntil: 'networkidle',
      });
      const button = page.getByRole('button');
      await expect(button).toBeVisible({ timeout: 10000 });
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
      await page.keyboard.press('Enter');
    });
  });
});
