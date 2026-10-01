// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/MiddleTruncator
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

const harness = (page: import('@playwright/test').Page) =>
  page.getByTestId('middle-truncator-harness');

describe('MiddleTruncator Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    it('truncated matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--truncated', 'light');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-truncated-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('full width matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--full-width', 'light');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-full-width-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('short text matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--short-text', 'light');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-short-text-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('trailing chars matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--trailing-chars', 'light');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-trailing-chars-light.png', {
        maxDiffPixels: 100,
      });
    });

    it('exposes title and aria-label', async ({ page }) => {
      await goto(page, 'display-middletruncator--truncated', 'light');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      const label = page.getByLabel(
        'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv'
      );
      await expect(label).toBeVisible({ timeout: 10000 });
      await expect(label).toHaveAttribute(
        'title',
        'console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-01.csv'
      );
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    it('truncated matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--truncated');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-truncated-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('full width matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--full-width');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-full-width-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('short text matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--short-text');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-short-text-dark.png', {
        maxDiffPixels: 100,
      });
    });

    it('trailing chars matches snapshot', async ({ page }) => {
      await goto(page, 'display-middletruncator--trailing-chars');
      const node = harness(page);
      await expect(node).toBeVisible({ timeout: 10000 });
      await expect(node).toHaveScreenshot('middle-truncator-trailing-chars-dark.png', {
        maxDiffPixels: 100,
      });
    });
  });
});
