// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/SidebarNavigationTitle
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="sidebar-navigationtitle-harness"]';

const variants = [
  { story: 'main-title', name: 'main-title' },
  { story: 'main-title-selected', name: 'main-title-selected' },
  { story: 'sql-sidebar-title', name: 'sql-sidebar-title' },
];

describe('SidebarNavigationTitle Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`sidebar-navigationtitle--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`sidebar-navigation-title-${name}-light.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`sidebar-navigationtitle--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(`sidebar-navigation-title-${name}-dark.png`, {
          maxDiffPixels: 100,
        });
      });
    }
  });
});
