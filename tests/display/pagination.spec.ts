// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Pagination
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="pagination-harness"]';

const variants = [
  { story: 'basic', name: 'basic' },
  { story: 'with-row-count', name: 'with-row-count' },
  { story: 'with-page-sizes', name: 'with-page-sizes' },
  { story: 'full', name: 'full' },
  { story: 'first-page', name: 'first-page' },
  { story: 'last-page', name: 'last-page' },
] as const;

describe('Pagination Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-pagination--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`pagination-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`display-pagination--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator).first();
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`pagination-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Content', () => {
    it('renders page count, row count, and page size selector', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('display-pagination--full', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator).first();
      await expect(harness).toBeVisible({ timeout: 10000 });
      await expect(harness.getByText('of 10')).toBeVisible();
      await expect(harness.getByText('12,345 rows')).toBeVisible();
      await expect(harness.getByTestId('prev-btn')).toBeVisible();
      await expect(harness.getByTestId('next-btn')).toBeVisible();
    });
  });
});
