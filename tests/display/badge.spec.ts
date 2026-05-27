import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const goto = async (
  page: import('@playwright/test').Page,
  story: string,
  theme?: 'light'
) => {
  await page.goto(getStoryUrl(story, theme), { waitUntil: 'networkidle' });
};

const badge = (page: import('@playwright/test').Page) =>
  page.locator('[data-testid$="-badge-content"]').first().locator('..');

describe('Badge Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    describe('Opaque Type Variants', () => {
      it('opaque default matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-default', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque success matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-success', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-success-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque neutral matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-neutral', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-neutral-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque danger matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-danger', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-danger-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque disabled matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-disabled', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque warning matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-warning', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-warning-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque info matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-info', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-info-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Solid Type Variants', () => {
      it('solid default matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-default', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-default-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid success matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-success', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-success-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid neutral matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-neutral', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-neutral-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid danger matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-danger', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-danger-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid disabled matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-disabled', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-disabled-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid warning matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-warning', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-warning-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid info matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-info', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-info-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Size Variants', () => {
      it('size sm matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--size-sm', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-size-sm-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('size md matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--size-md', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-size-md-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Icon Variants', () => {
      it('icon start matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--icon-start', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-icon-start-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('icon end matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--icon-end', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-icon-end-light.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Dismissible', () => {
      it('dismissible matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--dismissible', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-dismissible-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('dismissible with icon matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--dismissible-with-icon', 'light');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-dismissible-with-icon-light.png', {
          maxDiffPixels: 100,
        });
      });

      it('close button exposes aria-label', async ({ page }) => {
        await goto(page, 'display-badge--dismissible', 'light');
        const closeButton = page.getByLabel('close').first();
        await expect(closeButton).toBeVisible({ timeout: 10000 });
      });

      it('close button is clickable', async ({ page }) => {
        // Smoke test: the close icon resolves under getByLabel('close') and
        // accepts a click without throwing. The story's onClose is a no-op,
        // so this does NOT prove the handler fires — it only guarantees the
        // close target stays clickable through the migration.
        await goto(page, 'display-badge--dismissible', 'light');
        const closeButton = page.getByLabel('close').first();
        await expect(closeButton).toBeVisible({ timeout: 10000 });
        await closeButton.click();
      });
    });

    describe('Ellipsis Off', () => {
      it('ellipsis off renders normal badge content', async ({ page }) => {
        await goto(page, 'display-badge--ellipsis-off', 'light');
        const normal = page.getByTestId('normal-badge-content');
        await expect(normal).toBeVisible({ timeout: 10000 });
        await expect(normal.locator('..')).toHaveScreenshot(
          'badge-ellipsis-off-light.png',
          { maxDiffPixels: 100 }
        );
      });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    describe('Opaque Type Variants', () => {
      it('opaque default matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-default');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque success matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-success');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-success-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque neutral matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-neutral');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-neutral-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque danger matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-danger');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-danger-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque disabled matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-disabled');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque warning matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-warning');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-warning-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('opaque info matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--opaque-info');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-opaque-info-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Solid Type Variants', () => {
      it('solid default matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-default');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-default-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid success matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-success');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-success-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid neutral matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-neutral');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-neutral-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid danger matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-danger');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-danger-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid disabled matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-disabled');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-disabled-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid warning matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-warning');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-warning-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('solid info matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--solid-info');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-solid-info-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Size Variants', () => {
      it('size sm matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--size-sm');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-size-sm-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('size md matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--size-md');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-size-md-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Icon Variants', () => {
      it('icon start matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--icon-start');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-icon-start-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('icon end matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--icon-end');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-icon-end-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Dismissible', () => {
      it('dismissible matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--dismissible');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-dismissible-dark.png', {
          maxDiffPixels: 100,
        });
      });

      it('dismissible with icon matches snapshot', async ({ page }) => {
        await goto(page, 'display-badge--dismissible-with-icon');
        const node = badge(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot('badge-dismissible-with-icon-dark.png', {
          maxDiffPixels: 100,
        });
      });
    });

    describe('Ellipsis Off', () => {
      it('ellipsis off renders normal badge content', async ({ page }) => {
        await goto(page, 'display-badge--ellipsis-off');
        const normal = page.getByTestId('normal-badge-content');
        await expect(normal).toBeVisible({ timeout: 10000 });
        await expect(normal.locator('..')).toHaveScreenshot(
          'badge-ellipsis-off-dark.png',
          { maxDiffPixels: 100 }
        );
      });
    });
  });
});
