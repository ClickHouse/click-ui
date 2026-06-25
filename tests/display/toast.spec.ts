// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Toast
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

// The toast root is portaled by Radix into the viewport. Radix renders two
// role="status" nodes — an off-screen announce element and the real toast <li>.
// The real toast is the one carrying data-state="open".
const toast = (page: import('@playwright/test').Page) =>
  page.locator('li[role="status"][data-state="open"]');

const stories = [
  { id: 'default', name: 'default' },
  { id: 'success', name: 'success' },
  { id: 'warning', name: 'warning' },
  { id: 'danger', name: 'danger' },
  { id: 'title-only', name: 'title-only' },
  { id: 'with-actions', name: 'with-actions' },
] as const;

describe('Toast Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { id, name } of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await goto(page, `display-toast--${id}`, 'light');
        const node = toast(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot(`toast-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { id, name } of stories) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await goto(page, `display-toast--${id}`);
        const node = toast(page);
        await expect(node).toBeVisible({ timeout: 10000 });
        await expect(node).toHaveScreenshot(`toast-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Behavior', () => {
    it('renders the close button and dismisses on click', async ({ page }) => {
      await goto(page, 'display-toast--default', 'light');
      const node = toast(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      const closeButton = node.getByRole('button', { name: 'cross' });
      await closeButton.click();
      await expect(node).toBeHidden({ timeout: 10000 });
    });

    it('exposes action buttons', async ({ page }) => {
      await goto(page, 'display-toast--with-actions', 'light');
      const node = toast(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node.getByRole('button', { name: 'Confirm' })).toBeVisible();
      await expect(node.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });
  });
});
