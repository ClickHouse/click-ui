// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/SidebarNavigationItem
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe, use } = it;

const harnessLocator = '[data-testid="sidebar-navigationitem-harness"]';

const variants = [
  { story: 'main-item', name: 'main-item' },
  { story: 'main-item-selected', name: 'main-item-selected' },
  { story: 'main-item-disabled', name: 'main-item-disabled' },
  { story: 'main-sub-item', name: 'main-sub-item' },
  { story: 'sql-sidebar-item', name: 'sql-sidebar-item' },
  { story: 'sql-sidebar-item-selected', name: 'sql-sidebar-item-selected' },
  { story: 'as-child-selected', name: 'as-child-selected' },
  { story: 'as-child-disabled', name: 'as-child-disabled' },
];

describe('SidebarNavigationItem Visual Regression', () => {
  describe('Light Theme (Storybook Global)', () => {
    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`sidebar-navigationitem--${story}`, 'light'), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(
          `sidebar-navigation-item-${name}-light.png`,
          {
            maxDiffPixels: 100,
          }
        );
      });
    }

    it('as-child focus state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('sidebar-navigationitem--as-child', 'light'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Tables' })).toBeFocused();
      await expect(harness).toHaveScreenshot(
        'sidebar-navigation-item-as-child-focus-light.png',
        {
          maxDiffPixels: 100,
        }
      );
    });
  });

  describe('Dark Theme (System prefers-color-scheme)', () => {
    use({ colorScheme: 'dark' });

    for (const { story, name } of variants) {
      it(`${name} matches snapshot`, async ({ page }) => {
        await page.goto(getStoryUrl(`sidebar-navigationitem--${story}`), {
          waitUntil: 'networkidle',
        });
        const harness = page.locator(harnessLocator);
        await expect(harness).toBeVisible({ timeout: 10000 });
        await expect(harness).toHaveScreenshot(
          `sidebar-navigation-item-${name}-dark.png`,
          {
            maxDiffPixels: 100,
          }
        );
      });
    }

    it('as-child focus state matches snapshot', async ({ page }) => {
      await page.goto(getStoryUrl('sidebar-navigationitem--as-child'), {
        waitUntil: 'networkidle',
      });
      const harness = page.locator(harnessLocator);
      await expect(harness).toBeVisible({ timeout: 10000 });
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Tables' })).toBeFocused();
      await expect(harness).toHaveScreenshot(
        'sidebar-navigation-item-as-child-focus-dark.png',
        {
          maxDiffPixels: 100,
        }
      );
    });
  });

  describe('Keyboard', () => {
    it('as-child disabled is not focusable via Tab', async ({ page }) => {
      await page.goto(getStoryUrl('sidebar-navigationitem--as-child-disabled', 'light'), {
        waitUntil: 'networkidle',
      });
      const link = page.getByRole('link', { name: 'Tables' });
      await expect(link).toHaveAttribute('aria-disabled', 'true');
      await page.locator('body').click();
      await page.keyboard.press('Tab');
      await expect(link).not.toBeFocused();
    });
  });
});
