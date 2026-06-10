// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/HoverCard
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

// The trigger is HoverCard's only own styling (`width: fit-content`).
const trigger = (page: import('@playwright/test').Page) =>
  page.getByText('Hover Here');

// The content panel is portaled by Radix and carries data-state="open" once shown.
const panel = (page: import('@playwright/test').Page) =>
  page.locator('[data-state="open"]').filter({ hasText: 'Hover Title' });

describe('HoverCard Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('closed trigger matches snapshot', async ({ page }) => {
      await goto(page, 'display-hovercard--trigger-closed', 'light');
      const node = trigger(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('hover-card-trigger-closed-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('open without arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-hovercard--open-no-arrow', 'light');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('hover-card-open-no-arrow-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('open with arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-hovercard--open-with-arrow', 'light');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('hover-card-open-with-arrow-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('opens the card on hover', async ({ page }) => {
      await goto(page, 'display-hovercard--playground', 'light');
      const node = trigger(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await node.hover();
      await expect(panel(page)).toBeVisible({ timeout: 10000 });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('closed trigger matches snapshot', async ({ page }) => {
      await goto(page, 'display-hovercard--trigger-closed');
      const node = trigger(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('hover-card-trigger-closed-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('open without arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-hovercard--open-no-arrow');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('hover-card-open-no-arrow-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('open with arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-hovercard--open-with-arrow');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('hover-card-open-with-arrow-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
