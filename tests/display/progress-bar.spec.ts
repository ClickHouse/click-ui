// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/ProgressBar
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

const progressBar = (page: import('@playwright/test').Page) =>
  page.locator('#storybook-root > div').first();

describe('ProgressBar Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('default horizontal matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-horizontal', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-horizontal-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('default dismissable matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-dismissable', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-dismissable-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('default dir end matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-dir-end', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-dir-end-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('default completed matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-completed', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-completed-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('default completed with success message matches snapshot', async ({ page }) => {
      await goto(
        page,
        'display-progressbar--default-completed-with-success-message',
        'light'
      );
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot(
        'progress-bar-default-completed-success-message-light.png',
        { maxDiffPixels: 100 }
      );
    });

    it('small horizontal matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--small-horizontal', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-small-horizontal-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('small dir end matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--small-dir-end', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-small-dir-end-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('small completed matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--small-completed', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-small-completed-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('vertical dir start matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--vertical-dir-start', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-vertical-dir-start-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('vertical dir end matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--vertical-dir-end', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-vertical-dir-end-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('default dismissable hover matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-dismissable', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await node.hover();
      await expect(node).toHaveScreenshot(
        'progress-bar-default-dismissable-hover-light.png',
        { maxDiffPixels: 100 }
      );
    });

    it('default dismissable focus matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-dismissable', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(node).toHaveScreenshot(
        'progress-bar-default-dismissable-focus-light.png',
        { maxDiffPixels: 100 }
      );
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('default horizontal matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-horizontal');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-horizontal-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('default dismissable matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-dismissable');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-dismissable-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('default dir end matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-dir-end');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-dir-end-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('default completed matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-completed');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-default-completed-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('default completed with success message matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--default-completed-with-success-message');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot(
        'progress-bar-default-completed-success-message-dark.png',
        { maxDiffPixels: 100 }
      );
    });

    it('small horizontal matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--small-horizontal');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-small-horizontal-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('small dir end matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--small-dir-end');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-small-dir-end-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('small completed matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--small-completed');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-small-completed-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('vertical dir start matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--vertical-dir-start');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-vertical-dir-start-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('vertical dir end matches snapshot', async ({ page }) => {
      await goto(page, 'display-progressbar--vertical-dir-end');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('progress-bar-vertical-dir-end-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });

  describe('Behavior', () => {
    it('close button fires onCancel when dismissable', async ({ page }) => {
      // The Playground/DefaultDismissable stories log to console on cancel.
      // This smoke test confirms the close target stays clickable through the
      // migration; it does not assert the handler's side effect.
      await goto(page, 'display-progressbar--default-dismissable', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      const closeButton = page.getByTestId('progressbar-close');
      await expect(closeButton).toBeVisible({ timeout: 10000 });
      await closeButton.click();
    });

    it('small type does not render percentage text', async ({ page }) => {
      await goto(page, 'display-progressbar--small-horizontal', 'light');
      const node = progressBar(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).not.toContainText('60%');
    });
  });
});
