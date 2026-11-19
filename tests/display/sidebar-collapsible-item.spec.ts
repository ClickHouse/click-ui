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
        await expect(harness).toHaveScreenshot(
          `sidebar-collapsible-item-${name}-light.png`,
          {
            maxDiffPixels: 100,
          }
        );
      });
    }

    it('closed-main shows the focus ring when the trigger receives keyboard focus', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('sidebar-collapsibleitem--closed-main', 'light'), {
        waitUntil: 'networkidle',
      });
      await page.locator('body').click();
      await page.keyboard.press('Tab');

      const trigger = page.getByRole('button', { name: 'trigger children' });
      await expect(trigger).toBeFocused();
      await expect(page.locator(harnessLocator)).toHaveScreenshot(
        'sidebar-collapsible-item-focus-light.png',
        { maxDiffPixels: 100 }
      );
    });
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
        await expect(harness).toHaveScreenshot(
          `sidebar-collapsible-item-${name}-dark.png`,
          {
            maxDiffPixels: 100,
          }
        );
      });
    }

    it('closed-main shows the focus ring when the trigger receives keyboard focus', async ({
      page,
    }) => {
      await page.goto(getStoryUrl('sidebar-collapsibleitem--closed-main'), {
        waitUntil: 'networkidle',
      });
      await page.locator('body').click();
      await page.keyboard.press('Tab');

      const trigger = page.getByRole('button', { name: 'trigger children' });
      await expect(trigger).toBeFocused();
      await expect(page.locator(harnessLocator)).toHaveScreenshot(
        'sidebar-collapsible-item-focus-dark.png',
        { maxDiffPixels: 100 }
      );
    });
  });
});
