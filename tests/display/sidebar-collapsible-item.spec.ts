// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/SidebarCollapsibleItem
// @covers src/components/Collapsible
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="sidebar-collapsibleitem-harness"]';

const variants = [
  { story: 'closed-main', name: 'closed-main' },
  { story: 'open-main', name: 'open-main' },
  { story: 'closed-sql-sidebar', name: 'closed-sql-sidebar' },
];

describe('SidebarCollapsibleItem Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`sidebar-collapsibleitem--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`sidebar-collapsible-item-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`sidebar-collapsibleitem--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`sidebar-collapsible-item-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
