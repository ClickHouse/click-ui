// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Tooltip
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

// The trigger wraps the content with no own styling.
const trigger = (page: import('@playwright/test').Page) =>
  page.getByText('Tooltip Trigger(Hover)');

// The visible content panel is portaled by Radix and carries data-state once
// shown (instant-open when controlled). Radix also renders a separate
// visually-hidden role="tooltip" node for screen readers — filtering on the
// styled panel's data-state avoids screenshotting that 1x1 a11y node.
const panel = (page: import('@playwright/test').Page) =>
  page
    .locator('[data-state="instant-open"], [data-state="delayed-open"]')
    .filter({ hasText: 'content' });

describe('Tooltip Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('open without arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-tooltip--open-no-arrow', 'light');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('tooltip-open-no-arrow-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('open with arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-tooltip--open-with-arrow', 'light');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('tooltip-open-with-arrow-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('open with maxWidth matches snapshot', async ({ page }) => {
      await goto(page, 'display-tooltip--open-max-width', 'light');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('tooltip-open-max-width-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('opens the tooltip on hover', async ({ page }) => {
      await goto(page, 'display-tooltip--playground', 'light');
      const node = trigger(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await node.hover();
      await expect(panel(page).first()).toBeVisible({ timeout: 10000 });
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('open without arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-tooltip--open-no-arrow');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('tooltip-open-no-arrow-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('open with arrow matches snapshot', async ({ page }) => {
      await goto(page, 'display-tooltip--open-with-arrow');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('tooltip-open-with-arrow-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('open with maxWidth matches snapshot', async ({ page }) => {
      await goto(page, 'display-tooltip--open-max-width');
      const node = panel(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('tooltip-open-max-width-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
