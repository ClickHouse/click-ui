// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Table
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const variants = [
  { story: 'playground', name: 'playground' },
  { story: 'selectable', name: 'selectable' },
  { story: 'long-text', name: 'long-text' },
  { story: 'long-text-wrap', name: 'long-text-wrap' },
  { story: 'long-text-truncated', name: 'long-text-truncated' },
  { story: 'long-text-truncated-middle', name: 'long-text-truncated-middle' },
  { story: 'sortable', name: 'sortable' },
  { story: 'sorted-descending', name: 'sorted-descending' },
  { story: 'column-level-truncation', name: 'column-level-truncation' },
  { story: 'resizable-columns', name: 'resizable-columns' },
  { story: 'medium-size', name: 'medium-size' },
  { story: 'row-states', name: 'row-states' },
  { story: 'with-actions', name: 'with-actions' },
  { story: 'loading', name: 'loading' },
  { story: 'no-data', name: 'no-data' },
  { story: 'no-header', name: 'no-header' },
  { story: 'mobile-layout', name: 'mobile-layout' },
] as const;

const themes = ['light', 'dark'] as const;

describe('Table Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of variants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(`display-table--${story}`, theme), {
            waitUntil: 'networkidle',
          });
          const region = page.getByRole('table').first();
          await expect(region).toBeVisible({ timeout: 10000 });
          await expect(region).toHaveScreenshot(`table-${name}-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      }
    });
  }

  describe('Interactive States', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('row hover matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-table--playground', theme), {
            waitUntil: 'networkidle',
          });
          const table = page.getByRole('table').first();
          await expect(table).toBeVisible({ timeout: 10000 });
          const firstRow = table.getByRole('row').nth(1);
          await firstRow.hover();
          await page.waitForTimeout(100);
          await expect(table).toHaveScreenshot(`table-row-hover-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });

        it('resizer focus matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-table--resizable-columns', theme), {
            waitUntil: 'networkidle',
          });
          const table = page.getByRole('table').first();
          await expect(table).toBeVisible({ timeout: 10000 });
          const resizer = page.getByRole('separator').first();
          await resizer.focus();
          await expect(resizer).toBeFocused();
          await page.waitForTimeout(100);
          await expect(table).toHaveScreenshot(`table-resizer-focus-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      });
    }
  });

  describe('Mobile List Layout', () => {
    for (const theme of themes) {
      it(`${theme} mobile list layout matches snapshot`, async ({ page }) => {
        await page.setViewportSize({ width: 480, height: 800 });
        await page.goto(getStoryUrl('display-table--selectable', theme), {
          waitUntil: 'networkidle',
        });
        const table = page.getByRole('table').first();
        await expect(table).toBeVisible({ timeout: 10000 });
        await expect(table).toHaveScreenshot(`table-mobile-list-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Accessibility', () => {
    it('exposes column resizer separators with labels', async ({ page }) => {
      await page.goto(getStoryUrl('display-table--resizable-columns', 'light'), {
        waitUntil: 'networkidle',
      });
      const resizers = page.getByRole('separator');
      await expect(resizers.first()).toBeVisible({ timeout: 10000 });
      await expect(resizers.first()).toHaveAttribute('aria-orientation', 'vertical');
    });
  });
});
