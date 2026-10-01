// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/FileTabs
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const harnessId = 'filetabs-harness';

const variants = [
  { story: 'display-filetabs--default', name: 'default' },
  { story: 'display-filetabs--selected', name: 'selected' },
  { story: 'display-filetabs--preview', name: 'preview' },
  { story: 'display-filetabs--status-success', name: 'status-success' },
  { story: 'display-filetabs--status-warning', name: 'status-warning' },
  { story: 'display-filetabs--status-danger', name: 'status-danger' },
  { story: 'display-filetabs--status-neutral', name: 'status-neutral' },
  { story: 'display-filetabs--status-info', name: 'status-info' },
  { story: 'display-filetabs--fixed-elements', name: 'fixed-elements' },
] as const;

const themes = ['light', 'dark'] as const;

describe('FileTabs Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of variants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(story, theme), {
            waitUntil: 'networkidle',
          });
          const harness = page.getByTestId(harnessId);
          await expect(harness).toBeVisible({ timeout: 10000 });
          await expect(harness).toHaveScreenshot(`filetabs-${name}-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      }
    });
  }

  describe('Interactive States', () => {
    for (const theme of themes) {
      it(`hover reveals close button on a tab (${theme})`, async ({ page }) => {
        await page.goto(getStoryUrl('display-filetabs--default', theme), {
          waitUntil: 'networkidle',
        });
        const harness = page.getByTestId(harnessId);
        await expect(harness).toBeVisible({ timeout: 10000 });
        const tab = page.getByRole('tab').nth(1);
        await tab.hover();
        await page.waitForTimeout(100);
        await expect(harness).toHaveScreenshot(`filetabs-hover-${theme}.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Accessibility', () => {
    it('renders a tablist with tabs', async ({ page }) => {
      await page.goto(getStoryUrl('display-filetabs--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const tablist = page.getByRole('tablist');
      await expect(tablist).toBeVisible({ timeout: 10000 });
      const tabs = page.getByRole('tab');
      await expect(tabs).toHaveCount(3);
    });

    it('selects a tab on click', async ({ page }) => {
      await page.goto(getStoryUrl('display-filetabs--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const tabs = page.getByRole('tab');
      await expect(tabs.first()).toBeVisible({ timeout: 10000 });
      await tabs.nth(2).click();
      await expect(tabs.nth(2)).toBeVisible();
    });
  });
});
