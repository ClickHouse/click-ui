// Affected-spec coverage for scoped visual-regression runs in CI.
// See .scripts/js/affected-visual-specs
// @covers src/components/Tabs
import { test as it, expect } from '@playwright/test';
import { getStoryUrl } from '../utils';

const { describe } = it;

const tabsHarness = '[data-testid="tabs-harness"]';
const fullWidthHarness = '[data-testid="full-width-tabs-harness"]';

const themes = ['light', 'dark'] as const;

const tabsVariants = [
  { story: 'default', name: 'default' },
  { story: 'first-selected', name: 'first-selected' },
] as const;

const fullWidthVariants = [
  { story: 'default', name: 'default' },
  { story: 'fixed-width-trigger', name: 'fixed-width-trigger' },
] as const;

describe('Tabs Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of tabsVariants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(`display-tabs--${story}`, theme), {
            waitUntil: 'networkidle',
          });
          const region = page.locator(tabsHarness);
          await expect(region).toBeVisible({ timeout: 10000 });
          await expect(region).toHaveScreenshot(`tabs-${name}-${theme}.png`, {
            maxDiffPixels: 100,
          });
        });
      }
    });
  }

  describe('Interactive States', () => {
    for (const theme of themes) {
      describe(`${theme} theme`, () => {
        it('inactive trigger hover matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-tabs--default', theme), {
            waitUntil: 'networkidle',
          });
          const trigger = page.getByRole('tab', { name: 'Tab 1' });
          await expect(trigger).toBeVisible({ timeout: 10000 });
          await trigger.hover();
          await page.waitForTimeout(100);
          await expect(page.locator(tabsHarness)).toHaveScreenshot(
            `tabs-trigger-hover-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });

        it('trigger focus matches snapshot', async ({ page }) => {
          await page.goto(getStoryUrl('display-tabs--default', theme), {
            waitUntil: 'networkidle',
          });
          // The Default story sets defaultValue: 'tab2', and Radix tabs use a
          // roving tabindex where only the active tab is the tabstop, so a
          // single Tab from <body> lands on Tab 2 (not Tab 1).
          const trigger = page.getByRole('tab', { name: 'Tab 2' });
          await expect(trigger).toBeVisible({ timeout: 10000 });
          await page.locator('body').click();
          await page.keyboard.press('Tab');
          await expect(trigger).toBeFocused();
          await page.waitForTimeout(100);
          await expect(page.locator(tabsHarness)).toHaveScreenshot(
            `tabs-trigger-focus-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });
      });
    }
  });

  describe('Behavior', () => {
    it('selects a tab on click', async ({ page }) => {
      await page.goto(getStoryUrl('display-tabs--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const tab1 = page.getByRole('tab', { name: 'Tab 1' });
      await expect(tab1).toBeVisible({ timeout: 10000 });
      await tab1.click();
      await expect(tab1).toHaveAttribute('data-state', 'active');
      await expect(page.getByText('Tab 1 content')).toBeVisible();
    });

    it('activates a tab with the keyboard', async ({ page }) => {
      await page.goto(getStoryUrl('display-tabs--default', 'light'), {
        waitUntil: 'networkidle',
      });
      const tab2 = page.getByRole('tab', { name: 'Tab 2' });
      await expect(tab2).toBeVisible({ timeout: 10000 });
      await tab2.focus();
      await page.keyboard.press('ArrowRight');
      const tab3 = page.getByRole('tab', { name: 'Tab 3' });
      await expect(tab3).toHaveAttribute('data-state', 'active');
      await expect(page.getByText('Tab 3 content')).toBeVisible();
    });
  });
});

describe('FullWidthTabs Visual Regression', () => {
  for (const theme of themes) {
    describe(`${theme} theme`, () => {
      for (const { story, name } of fullWidthVariants) {
        it(`${name} matches snapshot`, async ({ page }) => {
          await page.goto(getStoryUrl(`display-fullwidthtabs--${story}`, theme), {
            waitUntil: 'networkidle',
          });
          const region = page.locator(fullWidthHarness);
          await expect(region).toBeVisible({ timeout: 10000 });
          await expect(region).toHaveScreenshot(
            `full-width-tabs-${name}-${theme}.png`,
            { maxDiffPixels: 100 }
          );
        });
      }
    });
  }
});
